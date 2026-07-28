import { execSync } from "node:child_process";

export type DocControl = {
  shortHash: string;
  commitDate: string; // ISO 8601
};

function execGit(args: string): string | null {
  try {
    return execSync(`git ${args}`, { cwd: process.cwd() }).toString().trim();
  } catch {
    return null;
  }
}

// Resolved once, at build time (this site is statically generated), so a
// subprocess call here is cheap and never runs per-request. Prefers Vercel's
// system env var (no subprocess) when present, falls back to plain git
// (works in local dev, and would work at build time on any host).
function resolveFullHash(): string {
  return process.env.VERCEL_GIT_COMMIT_SHA ?? execGit("rev-parse HEAD") ?? "0000000";
}

function resolveCommitDate(): string {
  return execGit("log -1 --format=%aI") ?? new Date().toISOString();
}

export function getDocControl(): DocControl {
  const fullHash = resolveFullHash();
  return {
    shortHash: fullHash.slice(0, 7),
    commitDate: resolveCommitDate(),
  };
}
