export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type ProfileData = {
  name: string;
  bio: string;
  imageUrl: string;
  links: LinkItem[];
};

// TODO: 더미 값 — 실제 이름·소개·사진으로 교체
export const profile: ProfileData = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  imageUrl: "/profile.svg",
  // TODO: 더미 값 — 실제 링크로 교체
  links: [
    { id: "github", title: "GitHub", url: "https://github.com/your-id" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/your-id" },
    { id: "blog", title: "Blog", url: "https://example.com/blog" },
  ],
};
