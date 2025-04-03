import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function NewOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">New Orders</h2>
        <p className="text-muted-foreground">Manage your incoming orders</p>
      </div>

      <OrderTable data={mockOrders} type="new" />
    </div>
  );
}