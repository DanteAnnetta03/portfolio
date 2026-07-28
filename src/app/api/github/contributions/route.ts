import { NextResponse } from "next/server";
import { getContributionCalendar } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const calendar = await getContributionCalendar();

  if (!calendar) {
    return NextResponse.json({ calendar: null }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({ calendar }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
