import { supabaseAdmin } from "@/lib/supabase/server";
import { DB_TABLE_NAME } from "@/commons/constant";
import { UpdateBlanceHistorySubmit } from "@/app-controler/admin/sun-world-booking/type";

export async function POST(req: Request) {
  const { user_id, id_history, amount }: UpdateBlanceHistorySubmit = await req.json();

  const { data, error } = await supabaseAdmin.rpc(DB_TABLE_NAME.RF_REFUND_AGENT_BALANCE, {
    p_user_id: user_id,
    p_id_history: id_history,
    p_amount: amount,
  });

  if (error) {
    return Response.json(error, { status: 500 });
  }
  return Response.json({
    data,
  });
}
