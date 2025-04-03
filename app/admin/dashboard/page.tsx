import { StatsCard } from "@/components/stats-card";
import { SalesTable } from "@/components/sales-table";
import { mockStats, mockWeeklySales } from "@/lib/data";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your business metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Today Orders"
          value={mockStats.todayOrders.current}
          previousValue={mockStats.todayOrders.previous}
          trend={mockStats.todayOrders.trend}
        />
        <StatsCard
          title="Today Sale"
          value={mockStats.todaySales.current}
          previousValue={mockStats.todaySales.previous}
          trend={mockStats.todaySales.trend}
          prefix="$"
        />
        <StatsCard
          title="Today Approved"
          value={mockStats.todayApproved.current}
          previousValue={mockStats.todayApproved.previous}
          trend={mockStats.todayApproved.trend}
        />
        <StatsCard
          title="Today Cancelled"
          value={mockStats.todayCancelled.current}
          previousValue={mockStats.todayCancelled.previous}
          trend={mockStats.todayCancelled.trend}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Last 7 Day Sales</h3>
        <SalesTable data={mockWeeklySales} />
      </div>
    </div>
  );
}