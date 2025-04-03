"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface AddStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStatusDialog({ open, onOpenChange }: AddStatusDialogProps) {
  const [formData, setFormData] = useState({
    firstStatus: "",
    secondStatus: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="firstStatus">
              First Status
            </label>
            <Input
              id="firstStatus"
              value={formData.firstStatus}
              onChange={(e) => setFormData({ ...formData, firstStatus: e.target.value })}
              placeholder="Enter first status"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="secondStatus">
              Second Status
            </label>
            <Input
              id="secondStatus"
              value={formData.secondStatus}
              onChange={(e) => setFormData({ ...formData, secondStatus: e.target.value })}
              placeholder="Enter second status"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="description">
              Description
            </label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}