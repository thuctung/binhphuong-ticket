import OrderSuccessController from "@/app-controler/order-success";
import { getOrderDetail } from "@/lib/api-server/get-order-detail";

export default async function Page({ params }: { params: Promise<{ lng: string; code: string }> }) {
  const { code } = await params;
  const orderItem = await getOrderDetail(code);
  return <OrderSuccessController code={decodeURIComponent(code)} order={orderItem} />;
}
