import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/server";
import { ProfileUpdateStatusType } from "@/types";
import { DB_TABLE_NAME } from "@/commons/constant";

export async function POST(request: Request) {
  const { user_id, status, agent_level }: ProfileUpdateStatusType = await request.json();

  const { error } = await supabaseAdmin
    .from(DB_TABLE_NAME.PROFILES)
    .update({
      status,
      ...(agent_level != null && { agent_level }),
    })
    .eq("user_id", user_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: {} }, { status: 200 });
}
