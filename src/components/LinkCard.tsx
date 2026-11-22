type LinkCardProps = {
  title: string;
  url: string;
  clicks: number;
  onClick?: () => void;
};

export default function LinkCard({ title, url, clicks, onClick }: LinkCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="relative block w-full rounded-2xl border border-zinc-200 bg-white px-16 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-zinc-800 dark:bg-zinc-900"
    >
      {title}
      <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-zinc-400 dark:text-zinc-500">
        {clicks.toLocaleString()}회
      </span>
    </a>
  );
}
