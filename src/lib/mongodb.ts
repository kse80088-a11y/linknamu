import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다 (.env.local 확인).");
}

// 개발 모드의 핫 리로드나 서버리스 환경에서 연결이 계속 새로 생기지 않도록
// 클라이언트 연결 Promise를 전역에 한 번만 만들어 재사용한다.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

const clientPromise =
  globalForMongo._mongoClientPromise ?? new MongoClient(uri).connect();

globalForMongo._mongoClientPromise = clientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db(); // URI에 지정된 DB(linknamu) 사용
}
