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
import { Power, ChevronLeft, ChevronRight } from "lucide-react";
import { User } from "@/lib/data";

interface UsersTableProps {
  data: User[];
}

const statusStyles = {
  active: "bg-green-100 text-green-800",
  passive: "bg-gray-100 text-gray-800"
};

export function UsersTable({ data }: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleToggleStatus = (user: User) => {
    console.log("Toggle status for user:", user.email);
    // Implement status toggle logic here
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/50">
              <TableHead className="font-semibold">User</TableHead>
              <TableHead className="font-semibold">Role</TableHead>
              <TableHead className="font-semibold">Country</TableHead>
              <TableHead className="font-semibold">Product</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((user) => (
              <TableRow key={user.email} className="hover:bg-accent/30 transition-colors">
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.product}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleStatus(user)}
                    className={`h-8 w-8 ${
                      user.status === 'active' 
                        ? 'text-green-600 hover:text-green-700 hover:bg-green-50'
                        : 'text-gray-600 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Power className="h-4 w-4" />
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