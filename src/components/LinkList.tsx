"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

type LinkListProps = {
  links: LinkItem[];
};

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 모든 링크를 0회로 표시
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    let ignore = false;

    fetch("/api/clicks")
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: { counts: Record<string, number> }) => {
        // 로딩 중에 이미 클릭한 수가 있으면 서버 값이 그보다 작아지지 않게 맞춘다
        if (!ignore) {
          setCounts((prev) => {
            const next = { ...data.counts };
            for (const [id, n] of Object.entries(prev)) {
              next[id] = Math.max(next[id] ?? 0, n);
            }
            return next;
          });
        }
      })
      .catch((error) => console.error("클릭 수 조회 실패:", error));

    return () => {
      ignore = true;
    };
  }, []);

  function handleClick(id: string) {
    // 화면은 바로 +1 하고, 서버에는 백그라운드로 기록
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      keepalive: true, // 페이지를 떠나도 요청이 끝까지 전송되도록
    }).catch((error) => console.error("클릭 수 저장 실패:", error));
  }

  return (
    <ul className="mt-8 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            title={link.title}
            url={link.url}
            clicks={counts[link.id] ?? 0}
            onClick={() => handleClick(link.id)}
          />
        </li>
      ))}
    </ul>
  );
}
