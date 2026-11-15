import { NextResponse } from "next/server";
import { getSitesHomePage } from "@/lib/api-server/get-site";

export async function GET() {
  try {
    const result = await getSitesHomePage();
    return NextResponse.json(result, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
