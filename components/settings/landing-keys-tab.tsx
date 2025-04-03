"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockLandingKeys } from "@/lib/data";
import { LandingKeysTable } from "./landing-keys-table";
import { AddLandingKeyDialog } from "./add-landing-key-dialog";

export function LandingKeysTab() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Landing Keys</h3>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Landing Key
        </Button>
      </div>

      <LandingKeysTable data={mockLandingKeys} />
      <AddLandingKeyDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}