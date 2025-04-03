"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { mockCountries } from "@/lib/data";
import { CountriesTable } from "./countries-table";
import { AddCountryDialog } from "./add-country-dialog";

export function CountriesTab() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Countries</h3>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Country
        </Button>
      </div>

      <CountriesTable data={mockCountries} />
      <AddCountryDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}