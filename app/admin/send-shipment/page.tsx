import { mockOrders } from "@/lib/data";
import { ShipmentTable } from "@/components/shipment-table";

export default function SendShipment() {
  // Filter only approved orders for shipment
  const approvedOrders = mockOrders.filter(order => order.status === "approved");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Send Shipment</h2>
        <p className="text-muted-foreground">Create and manage shipments for approved orders</p>
      </div>

      <ShipmentTable data={approvedOrders} />
    </div>
  );
}