import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  imageUrl: string;
};

export default function Profile({ name, bio, imageUrl }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={imageUrl}
        alt={`${name} 프로필 사진`}
        width={112}
        height={112}
        priority
        unoptimized
        className="h-28 w-28 rounded-full border border-zinc-200 object-cover dark:border-zinc-800"
      />
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{bio}</p>
    </section>
  );
}
