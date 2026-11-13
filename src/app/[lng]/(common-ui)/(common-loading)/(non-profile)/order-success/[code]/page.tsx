import OrderSuccessController from "@/app-controler/order-success";

export default async function Page({ params }: { params: Promise<{ lng: string; code: string }> }) {
  const { code } = await params;
  return <OrderSuccessController code={decodeURIComponent(code)} />;
}
