import { mockOrders } from "@/lib/data";
import { OrderDetailForm } from "./order-detail-form";

export function generateStaticParams() {
  return mockOrders.map((order) => ({
    id: order.id,
  }));
}

export default function OrderDetail({ params }: { params: { id: string } }) {
  const order = mockOrders.find(order => order.id === params.id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderDetailForm orderId={params.id} initialData={order} />;
}