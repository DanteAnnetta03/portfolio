const REQUIRED_ENV_VARS = ["GITHUB_TOKEN"] as const;

function requireEnv(name: (typeof REQUIRED_ENV_VARS)[number]): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno "${name}".`);
  }
  return value;
}

const GITHUB_USERNAME = "DanteAnnetta03";

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  date: string;
  count: number;
  level: ContributionLevel;
};

export type ContributionCalendar = {
  totalContributions: number;
  weeks: ContributionDay[][];
};

const LEVEL_MAP: Record<string, ContributionLevel> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

const QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

type GraphQLResponse = {
  errors?: unknown;
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: {
              date: string;
              contributionCount: number;
              contributionLevel: string;
            }[];
          }[];
        };
      };
    };
  };
};

// Never forward raw errors/response bodies to logs or the client — the
// GraphQL response is authenticated as the account owner and could echo
// back account details; a short context string is enough to debug from
// Vercel's function logs.
function logGithubError(context: string, detail?: string) {
  console.error(`[github] ${context}${detail ? `: ${detail}` : ""}`);
}

// Called from src/app/api/github/contributions/route.ts on every request
// (the insight is meant to reflect activity in real time, not just at the
// last deploy) — never called from a Server Component, and the token never
// reaches the client, only the resulting calendar JSON does.
export async function getContributionCalendar(): Promise<ContributionCalendar | null> {
  let token: string;
  try {
    token = requireEnv(REQUIRED_ENV_VARS[0]);
  } catch {
    logGithubError("falta la variable de entorno GITHUB_TOKEN");
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: QUERY, variables: { login: GITHUB_USERNAME } }),
      cache: "no-store",
    });

    if (!res.ok) {
      logGithubError("respuesta no OK de la API de GitHub", String(res.status));
      return null;
    }

    const json = (await res.json()) as GraphQLResponse;
    if (json.errors) {
      logGithubError("la API de GitHub devolvió errores en la respuesta GraphQL");
      return null;
    }

    const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;
    if (!calendar) {
      logGithubError("respuesta sin contributionCalendar");
      return null;
    }

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks.map((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: LEVEL_MAP[day.contributionLevel] ?? 0,
        }))
      ),
    };
  } catch (err) {
    logGithubError("excepción al consultar la API de GitHub", err instanceof Error ? err.message : String(err));
    return null;
  }
}

export type StackTechnology = { name: string; score: number };

export type StackFrequency = {
  technologies: StackTechnology[];
  repositoryCount: number;
};

const STACK_TOP_N = 8;

// GitHub's linguist reports file-based language labels that don't always
// match how a technology is actually named/thought of — collapse those into
// their real name instead of splitting one technology across two bars.
const LANGUAGE_ALIASES: Record<string, string> = {
  Dockerfile: "Docker",
};

// Build/infra file types linguist detects as "languages" but that aren't
// real stack technologies for this chart (decision explicit del usuario,
// 2026-07-28) — excluded from the aggregation entirely (their bytes don't
// count toward a repo's total either, so they don't dilute the real
// languages' share). Checked against the name *after* LANGUAGE_ALIASES, so
// "Dockerfile" is covered via its alias "Docker".
const STACK_EXCLUDE = new Set(["Shell", "Makefile", "Docker", "Batchfile"]);

const STACK_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        commitContributionsByRepository(maxRepositories: 100) {
          contributions {
            totalCount
          }
          repository {
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

type StackGraphQLResponse = {
  errors?: unknown;
  data?: {
    user?: {
      contributionsCollection?: {
        commitContributionsByRepository?: {
          contributions: { totalCount: number };
          repository: {
            languages: { edges: { size: number; node: { name: string } }[] } | null;
          };
        }[];
      };
    };
  };
};

// Called from src/app/api/github/stack/route.ts on every request, same
// pattern as getContributionCalendar above. "Weight" per repo is the number
// of days with commit activity there in the last year (contributions.
// totalCount) — a cheap proxy for "how much I contributed", not a literal
// commit count (that would need a second, paginated query per repo). Each
// repo's weight is split across its languages proportional to their byte
// share, so a language that's 90% of a repo doesn't get the same credit as
// one that's 2% of it.
export async function getStackFrequency(): Promise<StackFrequency | null> {
  let token: string;
  try {
    token = requireEnv(REQUIRED_ENV_VARS[0]);
  } catch {
    logGithubError("falta la variable de entorno GITHUB_TOKEN");
    return null;
  }

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: STACK_QUERY, variables: { login: GITHUB_USERNAME } }),
      cache: "no-store",
    });

    if (!res.ok) {
      logGithubError("respuesta no OK de la API de GitHub (stack)", String(res.status));
      return null;
    }

    const json = (await res.json()) as StackGraphQLResponse;
    if (json.errors) {
      logGithubError("la API de GitHub devolvió errores en la respuesta GraphQL (stack)");
      return null;
    }

    const repos = json.data?.user?.contributionsCollection?.commitContributionsByRepository;
    if (!repos) {
      logGithubError("respuesta sin commitContributionsByRepository");
      return null;
    }

    const totals = new Map<string, number>();
    let repositoryCount = 0;

    for (const entry of repos) {
      const weight = entry.contributions.totalCount;
      const rawEdges = entry.repository.languages?.edges ?? [];
      const edges = rawEdges
        .map((edge) => ({ size: edge.size, name: LANGUAGE_ALIASES[edge.node.name] ?? edge.node.name }))
        .filter((edge) => !STACK_EXCLUDE.has(edge.name));
      const totalBytes = edges.reduce((sum, edge) => sum + edge.size, 0);
      if (weight === 0 || totalBytes === 0) continue;

      repositoryCount += 1;
      for (const edge of edges) {
        const share = edge.size / totalBytes;
        totals.set(edge.name, (totals.get(edge.name) ?? 0) + weight * share);
      }
    }

    if (totals.size === 0) return null;

    const sorted = Array.from(totals.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, STACK_TOP_N);
    const max = sorted[0][1];

    return {
      technologies: sorted.map(([name, value]) => ({
        name,
        // Math.max(1, …): a language with a real, nonzero share should never
        // display as "0" just because it rounded down — that reads as a bug,
        // not as "barely present".
        score: Math.max(1, Math.round((value / max) * 100)),
      })),
      repositoryCount,
    };
  } catch (err) {
    logGithubError(
      "excepción al consultar la API de GitHub (stack)",
      err instanceof Error ? err.message : String(err)
    );
    return null;
  }
}
