import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function AgentCancelledOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Cancelled Orders</h2>
        <p className="text-muted-foreground">View all cancelled orders</p>
      </div>

      <OrderTable data={mockOrders} type="cancelled" />
    </div>
  );
}