"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockStatusList } from "@/lib/data";
import { StatusTable } from "./status-table";
import { AddStatusDialog } from "./add-status-dialog";

export function StatusTab() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Status List</h3>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Status
        </Button>
      </div>

      <StatusTable data={mockStatusList} />
      <AddStatusDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}