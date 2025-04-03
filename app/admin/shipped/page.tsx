import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function ShippedOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Shipped Orders</h2>
        <p className="text-muted-foreground">Track your shipped orders</p>
      </div>

      <OrderTable data={mockOrders} type="shipped" />
    </div>
  );
}