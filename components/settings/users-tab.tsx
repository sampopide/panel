"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockUsers } from "@/lib/data";
import { UsersTable } from "./users-table";
import { AddUserDialog } from "./add-user-dialog";

export function UsersTab() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Users</h3>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UsersTable data={mockUsers} />
      <AddUserDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}