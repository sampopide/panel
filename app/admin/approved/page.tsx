import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function ApprovedOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Approved Orders</h2>
        <p className="text-muted-foreground">View all approved orders</p>
      </div>

      <OrderTable data={mockOrders} type="approved" />
    </div>
  );
}