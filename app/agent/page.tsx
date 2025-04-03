"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Plus, Eye } from "lucide-react";
import { mockAgentOrders, mockAgentStats } from "@/lib/data";

export default function AgentDashboard() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = mockAgentOrders.slice(startIndex, endIndex);
  const totalPages = Math.ceil(mockAgentOrders.length / itemsPerPage);

  const handleViewOrder = (orderId: string) => {
    router.push(`/agent/orders/${orderId}`);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Agent Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, Agent</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Today Approved Orders</p>
          <p className="text-2xl font-bold">{mockAgentStats.todayApproved}</p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Today Canceled Orders</p>
          <p className="text-2xl font-bold">{mockAgentStats.todayCancelled}</p>
        </Card>

        <Card className="p-6 space-y-2">
          <p className="text-sm text-muted-foreground">Total Waiting Orders</p>
          <p className="text-2xl font-bold">{mockAgentStats.totalWaiting}</p>
        </Card>

        <Card className="p-6 flex flex-col justify-center items-center bg-blue-50 border-blue-200">
          <Button className="w-full h-full text-lg bg-blue-600 hover:bg-blue-700">
            <Plus className="h-5 w-5 mr-2" />
            Take New Order
          </Button>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Assigned Orders</h3>
        
        <div className="rounded-lg border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-accent/50">
                <TableHead className="font-semibold">Order No</TableHead>
                <TableHead className="font-semibold">Customer Name</TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Called</TableHead>
                <TableHead className="font-semibold">Order Date</TableHead>
                <TableHead className="font-semibold">Product</TableHead>
                <TableHead className="font-semibold">Price</TableHead>
                <TableHead className="font-semibold">Updated At</TableHead>
                <TableHead className="font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((order) => (
                <TableRow key={order.orderNo} className="hover:bg-accent/30 transition-colors">
                  <TableCell className="font-medium">{order.orderNo}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.called}</TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                  <TableCell>{order.product}</TableCell>
                  <TableCell>${order.price}</TableCell>
                  <TableCell>{order.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewOrder(order.orderNo)}
                      className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, mockAgentOrders.length)} of {mockAgentOrders.length} entries
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
    </div>
  );
}