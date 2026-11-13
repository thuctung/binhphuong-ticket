import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { DB_TABLE_NAME } from "@/commons/constant";

export async function GET(request: Request) {
  const { data, error } = await supabaseAdmin
    .from(DB_TABLE_NAME.SITES)
    .select(`*,location:location(code,name,en,zh,ko)`)
    .order("order", { ascending: true })
    .limit(6);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data || [] }, { status: 200 });
}
