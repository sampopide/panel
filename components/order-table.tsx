"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Order } from "@/lib/data";
import { useState } from "react";

interface OrderTableProps {
  data: Order[];
  type?: 'new' | 'approved' | 'cancelled' | 'shipped' | 'unreachable' | 'call_later' | 'trash';
}

const statusStyles = {
  new: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  shipped: "bg-purple-100 text-purple-800",
  unreachable: "bg-orange-100 text-orange-800",
  call_later: "bg-yellow-100 text-yellow-800",
  trash: "bg-gray-100 text-gray-800"
};

const statusLabels = {
  new: "New Order",
  approved: "Approved",
  cancelled: "Cancelled",
  shipped: "Shipped",
  unreachable: "Unreachable",
  call_later: "Call Later",
  trash: "Trash"
};

export function OrderTable({ data, type }: OrderTableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isAgentRoute = pathname.startsWith('/agent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const filteredData = type ? data.filter(order => order.status === type) : data;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleViewOrder = (orderId: string) => {
    const basePath = isAgentRoute ? '/agent/orders' : '/admin/orders';
    router.push(`${basePath}/${orderId}`);
  };

  const renderTableHeaders = () => {
    if (type === 'trash') {
      return (
        <TableRow className="bg-accent/50">
          <TableHead className="font-semibold">Order No</TableHead>
          <TableHead className="font-semibold">Customer Name</TableHead>
          <TableHead className="font-semibold">Phone</TableHead>
          {!isAgentRoute && <TableHead className="font-semibold">Referrer</TableHead>}
          <TableHead className="font-semibold">Order Date</TableHead>
          <TableHead className="font-semibold">Product</TableHead>
          <TableHead className="font-semibold">Price</TableHead>
          <TableHead className="font-semibold">Currency</TableHead>
          <TableHead className="font-semibold">Reason</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold text-right">Action</TableHead>
        </TableRow>
      );
    }

    if (type === 'call_later') {
      return (
        <TableRow className="bg-accent/50">
          <TableHead className="font-semibold">Order No</TableHead>
          <TableHead className="font-semibold">Customer Name</TableHead>
          <TableHead className="font-semibold">Phone</TableHead>
          <TableHead className="font-semibold">Called</TableHead>
          <TableHead className="font-semibold">Agent</TableHead>
          {!isAgentRoute && <TableHead className="font-semibold">Referrer</TableHead>}
          <TableHead className="font-semibold">Order Date</TableHead>
          <TableHead className="font-semibold">Recall Time</TableHead>
          <TableHead className="font-semibold">Product</TableHead>
          <TableHead className="font-semibold">Price</TableHead>
          <TableHead className="font-semibold">Currency</TableHead>
          <TableHead className="font-semibold">Status</TableHead>
          <TableHead className="font-semibold text-right">Action</TableHead>
        </TableRow>
      );
    }

    return (
      <TableRow className="bg-accent/50">
        <TableHead className="font-semibold">Order No</TableHead>
        <TableHead className="font-semibold">Customer Name</TableHead>
        <TableHead className="font-semibold">Phone</TableHead>
        <TableHead className="font-semibold">Called</TableHead>
        <TableHead className="font-semibold">Agent</TableHead>
        {!isAgentRoute && <TableHead className="font-semibold">Referrer</TableHead>}
        <TableHead className="font-semibold">Order Date</TableHead>
        <TableHead className="font-semibold">Updated Date</TableHead>
        <TableHead className="font-semibold">Product</TableHead>
        <TableHead className="font-semibold">Price</TableHead>
        <TableHead className="font-semibold">Currency</TableHead>
        <TableHead className="font-semibold">Status</TableHead>
        <TableHead className="font-semibold text-right">Action</TableHead>
      </TableRow>
    );
  };

  const renderTableRow = (order: Order) => {
    if (type === 'trash') {
      return (
        <TableRow key={order.id} className="hover:bg-accent/30 transition-colors">
          <TableCell className="font-medium">{order.id}</TableCell>
          <TableCell>{order.customerName}</TableCell>
          <TableCell>{order.phone}</TableCell>
          {!isAgentRoute && <TableCell>{order.referrer}</TableCell>}
          <TableCell>{order.orderDate}</TableCell>
          <TableCell>{order.product}</TableCell>
          <TableCell>{order.price}</TableCell>
          <TableCell>{order.currency}</TableCell>
          <TableCell className="font-medium text-rose-600">{order.reason}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleViewOrder(order.id)}
                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (type === 'call_later') {
      return (
        <TableRow key={order.id} className="hover:bg-accent/30 transition-colors">
          <TableCell className="font-medium">{order.id}</TableCell>
          <TableCell>{order.customerName}</TableCell>
          <TableCell>{order.phone}</TableCell>
          <TableCell>{order.called}</TableCell>
          <TableCell>{order.agent}</TableCell>
          {!isAgentRoute && <TableCell>{order.referrer}</TableCell>}
          <TableCell>{order.orderDate}</TableCell>
          <TableCell className="font-medium text-blue-600">{order.recallTime}</TableCell>
          <TableCell>{order.product}</TableCell>
          <TableCell>{order.price}</TableCell>
          <TableCell>{order.currency}</TableCell>
          <TableCell>
            <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}>
              {statusLabels[order.status]}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleViewOrder(order.id)}
                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    return (
      <TableRow key={order.id} className="hover:bg-accent/30 transition-colors">
        <TableCell className="font-medium">{order.id}</TableCell>
        <TableCell>{order.customerName}</TableCell>
        <TableCell>{order.phone}</TableCell>
        <TableCell>{order.called}</TableCell>
        <TableCell>{order.agent}</TableCell>
        {!isAgentRoute && <TableCell>{order.referrer}</TableCell>}
        <TableCell>{order.orderDate}</TableCell>
        <TableCell>{order.updatedDate}</TableCell>
        <TableCell>{order.product}</TableCell>
        <TableCell>{order.price}</TableCell>
        <TableCell>{order.currency}</TableCell>
        <TableCell>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}>
            {statusLabels[order.status]}
          </span>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleViewOrder(order.id)}
              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {renderTableHeaders()}
          </TableHeader>
          <TableBody>
            {currentData.map((order) => renderTableRow(order))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                className="w-8"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}