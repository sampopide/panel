import { mockShipmentLists } from "@/lib/data";
import { ShipmentListTable } from "@/components/shipment-list-table";

export default function ShipmentList() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Shipment Lists</h2>
        <p className="text-muted-foreground">View and manage your shipment lists</p>
      </div>

      <ShipmentListTable data={mockShipmentLists} />
    </div>
  );
}