type SectionHeadingProps = {
  index: string;
  title: string;
  deck?: string;
};

export default function SectionHeading({ index, title, deck }: SectionHeadingProps) {
  return (
    <div className="border-b border-line pb-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-blue">{index}</span>
        <h2 className="text-xl font-semibold uppercase tracking-wide text-ink">{title}</h2>
      </div>
      {deck && <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{deck}</p>}
    </div>
  );
}
