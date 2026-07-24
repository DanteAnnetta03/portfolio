import { NextResponse } from "next/server";
import { downloadDriveFile } from "@/lib/googleDrive";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Locale = "es" | "en";

function isLocale(value: string): value is Locale {
  return value === "es" || value === "en";
}

function getFileIdEnvVar(locale: Locale): string {
  return locale === "es" ? "GOOGLE_DRIVE_CV_ES_FILE_ID" : "GOOGLE_DRIVE_CV_EN_FILE_ID";
}

// Never forward `err` itself to the client or to logs: googleapis errors can
// carry the request config (including the bearer access token) on them.
function logServerError(context: string, err: unknown) {
  console.error(`[api/cv] ${context}:`, err instanceof Error ? err.message : String(err));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'Locale inválido. Usá "es" o "en".' }, { status: 400 });
  }

  const envVar = getFileIdEnvVar(locale);
  const fileId = process.env[envVar];
  if (!fileId) {
    logServerError(`falta la variable de entorno "${envVar}"`, null);
    return NextResponse.json({ error: "El CV no está disponible en este momento." }, { status: 500 });
  }

  let pdf: Buffer;
  try {
    pdf = await downloadDriveFile(fileId);
  } catch (err) {
    logServerError(`no se pudo descargar el CV (${locale}) desde Google Drive`, err);
    return NextResponse.json({ error: "No se pudo obtener el CV en este momento." }, { status: 502 });
  }

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cv-${locale}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}
