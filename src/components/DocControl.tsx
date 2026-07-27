"use client";

import { useDocControl } from "@/lib/docControl/DocControlContext";

// Per-section reference: just "DOC {id}", still an easter egg (links to the
// exact commit on GitHub). The REV/hash itself is shown once, in the Navbar
// only — repeating it on every section added noise without adding meaning.
export default function DocControl({
  id,
  className = "text-sm",
}: {
  id: string;
  className?: string;
}) {
  const { shortHash, commitUrl } = useDocControl();

  return (
    <a
      href={commitUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`font-mono text-blue transition-colors hover:text-ink ${className}`}
      title={`Ver commit ${shortHash} en GitHub`}
    >
      DOC {id}
    </a>
  );
}
