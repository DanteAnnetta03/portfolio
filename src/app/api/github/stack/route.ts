import { NextResponse } from "next/server";
import { getStackFrequency } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const stack = await getStackFrequency();

  if (!stack) {
    return NextResponse.json({ stack: null }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }

  return NextResponse.json({ stack }, { status: 200, headers: { "Cache-Control": "no-store" } });
}
