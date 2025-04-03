import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function AgentCallLaterOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Call Later</h2>
        <p className="text-muted-foreground">Orders that need follow-up calls</p>
      </div>

      <OrderTable data={mockOrders} type="call_later" />
    </div>
  );
}