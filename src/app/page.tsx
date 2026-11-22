import Profile from "@/components/Profile";
import LinkList from "@/components/LinkList";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12">
      <Profile name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />
      <LinkList links={profile.links} />
    </main>
  );
}
