import { google } from "googleapis";

// `googleapis` bundles its own internal copy of google-auth-library, whose
// OAuth2Client is a distinct (structurally incompatible, due to a private
// field) type from the standalone "google-auth-library" package — passing
// an instance of the latter to `google.drive({ auth })` fails to type-check.
// Using `google.auth.OAuth2` (re-exported from that same internal copy)
// keeps this call site and drive.files.get() speaking the same type.
type OAuth2Client = InstanceType<typeof google.auth.OAuth2>;

const REQUIRED_ENV_VARS = [
  "GOOGLE_OAUTH_CLIENT_ID",
  "GOOGLE_OAUTH_CLIENT_SECRET",
  "GOOGLE_OAUTH_REFRESH_TOKEN",
] as const;

function requireEnv(name: (typeof REQUIRED_ENV_VARS)[number]): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable de entorno "${name}".`);
  }
  return value;
}

let cachedClient: OAuth2Client | null = null;

// Built (and credentials re-validated) on every call rather than once at
// module load, so a missing/rotated env var fails loudly on the next
// request instead of silently reusing a stale client.
function getOAuth2Client(): OAuth2Client {
  const [clientId, clientSecret, refreshToken] = REQUIRED_ENV_VARS.map(requireEnv);

  if (!cachedClient) {
    cachedClient = new google.auth.OAuth2({ clientId, clientSecret });
  }

  // Cheap to call repeatedly: it only stores the refresh token in memory.
  // The client exchanges it for a short-lived access token lazily, on the
  // first request that needs one, and transparently refreshes it after that.
  cachedClient.setCredentials({ refresh_token: refreshToken });

  return cachedClient;
}

const GOOGLE_WORKSPACE_MIME_PREFIX = "application/vnd.google-apps.";
const EXPORT_MIME_TYPE = "application/pdf";

/**
 * Downloads a Google Drive file's content as a PDF, using the shared OAuth2
 * client. Always fetches the current version — callers that need "latest
 * upload/edit wins" behavior (like the CV download route) don't need to do
 * anything extra for that.
 *
 * Handles both:
 * - Regular uploaded files (already a PDF blob) — fetched via `alt: "media"`.
 * - Native Google Docs/Slides/Sheets — these aren't downloadable blobs, so
 *   they're rendered to PDF on the fly via the `files.export` endpoint.
 */
export async function downloadDriveFile(fileId: string): Promise<Buffer> {
  const auth = getOAuth2Client();
  const drive = google.drive({ version: "v3", auth });

  const { data: metadata } = await drive.files.get({ fileId, fields: "mimeType" });
  const isGoogleNative = metadata.mimeType?.startsWith(GOOGLE_WORKSPACE_MIME_PREFIX) ?? false;

  let data: unknown;
  if (isGoogleNative) {
    const response = await drive.files.export(
      { fileId, mimeType: EXPORT_MIME_TYPE },
      { responseType: "arraybuffer" },
    );
    data = response.data;
  } else {
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "arraybuffer" },
    );
    data = response.data;
  }

  return Buffer.from(data as ArrayBuffer);
}
