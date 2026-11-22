import { connection } from "next/server";
import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

type ClickDoc = { _id: string; count: number };

const linkIds = new Set(profile.links.map((link) => link.id));

async function clicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

// 모든 링크의 현재 클릭 수를 한 번에 반환: { counts: { github: 42, ... } }
export async function GET() {
  await connection(); // 항상 요청 시점에 실행 (빌드 시 프리렌더 방지)

  try {
    const docs = await (await clicksCollection()).find().toArray();
    const counts: Record<string, number> = {};
    for (const doc of docs) {
      if (linkIds.has(doc._id)) counts[doc._id] = doc.count;
    }
    return Response.json({ counts });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

// 특정 링크의 클릭 수를 1 증가: body { id: "github" }
export async function POST(request: Request) {
  let id: unknown;
  try {
    ({ id } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  if (typeof id !== "string" || !linkIds.has(id)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  try {
    const doc = await (await clicksCollection()).findOneAndUpdate(
      { _id: id },
      { $inc: { count: 1 } },
      { upsert: true, returnDocument: "after" },
    );
    return Response.json({ id, count: doc?.count ?? 1 });
  } catch (error) {
    console.error("클릭 수 증가 실패:", error);
    return Response.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
