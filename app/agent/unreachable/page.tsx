import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function AgentUnreachableOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Unreachable Orders</h2>
        <p className="text-muted-foreground">Orders with unreachable customers</p>
      </div>

      <OrderTable data={mockOrders} type="unreachable" />
    </div>
  );
}