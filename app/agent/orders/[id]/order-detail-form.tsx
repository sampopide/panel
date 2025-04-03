"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockProducts, Order } from "@/lib/data";

const provinces = [
  { id: 1, name: "Province 1" },
  { id: 2, name: "Province 2" },
  { id: 3, name: "Province 3" },
];

const districts = {
  1: [
    { id: 1, name: "District 1-1" },
    { id: 2, name: "District 1-2" },
  ],
  2: [
    { id: 3, name: "District 2-1" },
    { id: 4, name: "District 2-2" },
  ],
  3: [
    { id: 5, name: "District 3-1" },
    { id: 6, name: "District 3-2" },
  ],
};

const cancelReasons = [
  "Too expensive",
  "Changed mind",
  "Found better alternative",
  "Not interested",
  "Wrong number",
  "Other",
];

interface OrderDetailFormProps {
  orderId: string;
  initialData: Order;
}

export function OrderDetailForm({ orderId, initialData }: OrderDetailFormProps) {
  const router = useRouter();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(initialData.product);
  const [discount, setDiscount] = useState("0");
  const [status, setStatus] = useState(initialData.status);
  const [date, setDate] = useState<Date>();

  const basePrice = mockProducts.find(p => p.name === selectedProduct)?.price || 0;
  const discountAmount = parseFloat(discount) || 0;
  const totalPrice = basePrice - discountAmount;

  const handleSave = () => {
    // Implement save logic here
    console.log("Saving changes...");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Order #{orderId}</h2>
            <p className="text-muted-foreground">Edit order details</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </div>

      <div className="grid gap-8 grid-cols-12">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* Customer Information */}
          <div className="space-y-6 bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Customer Information</h3>
            <div className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input 
                    placeholder="Customer name"
                    defaultValue={initialData.customerName}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input 
                    placeholder="Phone number"
                    defaultValue={initialData.phone}
                  />
                </div>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Province</label>
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.id} value={province.id.toString()}>
                          {province.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">District</label>
                  <Select disabled={!selectedProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedProvince &&
                        districts[selectedProvince as keyof typeof districts].map((district) => (
                          <SelectItem key={district.id} value={district.id.toString()}>
                            {district.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Address</label>
                <Textarea 
                  placeholder="Detailed address"
                  defaultValue={initialData.address}
                />
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="space-y-6 bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Order Status</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ready_for_call">Ready for Call</SelectItem>
                    <SelectItem value="call_later">Call Later</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {status === "canceled" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Cancel Reason</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {cancelReasons.map((reason) => (
                        <SelectItem key={reason} value={reason}>
                          {reason}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {status === "call_later" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Callback Date & Time</label>
                  <div className="flex gap-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-8">
          {/* Product Information */}
          <div className="space-y-6 bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Product Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product</label>
                <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockProducts.map((product) => (
                      <SelectItem key={product.id} value={product.name}>
                        {product.name} - ${product.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Discount</label>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter discount amount"
                />
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <div className="flex justify-between text-sm">
                  <span>Base Price:</span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Discount:</span>
                  <span>-${discountAmount}</span>
                </div>
                <div className="flex justify-between font-medium mt-2 pt-2 border-t">
                  <span>Total Price:</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="space-y-6 bg-card rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Order Timeline</h3>
            <div className="space-y-4">
              <div className="relative pl-6 pb-6 border-l-2 border-accent">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600"></div>
                <p className="text-sm font-medium">Order Created</p>
                <p className="text-xs text-muted-foreground">{initialData.orderDate}</p>
              </div>
              <div className="relative pl-6 pb-6 border-l-2 border-accent">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-xs text-muted-foreground">{initialData.updatedDate}</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                <p className="text-sm font-medium">Current Status</p>
                <p className="text-xs text-muted-foreground capitalize">{initialData.status}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}