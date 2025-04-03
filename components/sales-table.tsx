import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SalesData {
  date: string;
  sales: number;
  orders: number;
  approved: number;
  cancelled: number;
  conversion: number;
}

interface SalesTableProps {
  data: SalesData[];
}

export function SalesTable({ data }: SalesTableProps) {
  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-accent/50">
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">Sales</TableHead>
            <TableHead className="font-semibold">Orders</TableHead>
            <TableHead className="font-semibold">Approved</TableHead>
            <TableHead className="font-semibold">Cancelled</TableHead>
            <TableHead className="font-semibold">Conversion</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.date} className="hover:bg-accent/30 transition-colors">
              <TableCell className="font-medium">{row.date}</TableCell>
              <TableCell className="text-emerald-600 font-medium">${row.sales.toLocaleString()}</TableCell>
              <TableCell>{row.orders}</TableCell>
              <TableCell className="text-blue-600">{row.approved}</TableCell>
              <TableCell className="text-rose-600">{row.cancelled}</TableCell>
              <TableCell className="font-medium">{row.conversion}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}