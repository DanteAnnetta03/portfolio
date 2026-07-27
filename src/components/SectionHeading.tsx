import DocControl from "@/components/DocControl";

type SectionHeadingProps = {
  docId: string;
  title: string;
  deck?: string;
};

export default function SectionHeading({ docId, title, deck }: SectionHeadingProps) {
  return (
    <div className="border-b border-line pb-4">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <DocControl id={docId} />
        <h2 className="text-xl font-medium uppercase tracking-wide text-ink">{title}</h2>
      </div>
      {deck && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{deck}</p>}
    </div>
  );
}
