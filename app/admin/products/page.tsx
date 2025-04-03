"use client";

import { useState } from "react";
import { mockProducts } from "@/lib/data";
import { ProductTable } from "@/components/product-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProductDialog } from "@/components/add-product-dialog";

export default function Products() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <ProductTable data={mockProducts} />
      <AddProductDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}