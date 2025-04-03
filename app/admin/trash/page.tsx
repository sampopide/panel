import { mockOrders } from "@/lib/data";
import { OrderTable } from "@/components/order-table";

export default function TrashOrders() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Trash</h2>
        <p className="text-muted-foreground">View deleted orders</p>
      </div>

      <OrderTable data={mockOrders} type="trash" />
    </div>
  );
}