"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockCities } from "@/lib/data";
import { CitiesTable } from "./cities-table";
import { AddCityDialog } from "./add-city-dialog";

export function CitiesTab() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Cities</h3>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add City
        </Button>
      </div>

      <CitiesTable data={mockCities} />
      <AddCityDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}