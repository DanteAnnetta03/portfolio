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
