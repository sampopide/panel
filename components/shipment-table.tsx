"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Order } from "@/lib/data";

interface ShipmentTableProps {
  data: Order[];
}

export function ShipmentTable({ data }: ShipmentTableProps) {
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedOrders.size === currentData.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(currentData.map(order => order.id)));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const handleCreateShipment = () => {
    console.log("Creating shipment for orders:", Array.from(selectedOrders));
    // Implement shipment creation logic here
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Create Shipment</h2>
        <Button
          onClick={handleCreateShipment}
          disabled={selectedOrders.size === 0}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Package className="mr-2 h-4 w-4" />
          Create Shipment List
        </Button>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={currentData.length > 0 && selectedOrders.size === currentData.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all orders"
                />
              </TableHead>
              <TableHead className="font-semibold">Order No</TableHead>
              <TableHead className="font-semibold">Customer Name</TableHead>
              <TableHead className="font-semibold">Phone</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Address</TableHead>
              <TableHead className="font-semibold">Product</TableHead>
              <TableHead className="font-semibold">SKU</TableHead>
              <TableHead className="font-semibold">Quantity</TableHead>
              <TableHead className="font-semibold">Price</TableHead>
              <TableHead className="font-semibold">Currency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((order) => (
              <TableRow key={order.id} className="hover:bg-accent/30 transition-colors">
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.has(order.id)}
                    onCheckedChange={() => handleSelectOrder(order.id)}
                    aria-label={`Select order ${order.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{order.country}</TableCell>
                <TableCell className="max-w-[200px] truncate">{order.address}</TableCell>
                <TableCell>{order.product}</TableCell>
                <TableCell>{order.sku}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.price}</TableCell>
                <TableCell>{order.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
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