"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CheckCircle,
  XCircle,
  PhoneCall,
  PhoneOff,
  Truck,
  LogOut
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/agent", icon: LayoutDashboard },
  { name: "Approved", href: "/agent/approved", icon: CheckCircle },
  { name: "Canceled", href: "/agent/cancelled", icon: XCircle },
  { name: "Call Later", href: "/agent/call-later", icon: PhoneCall },
  { name: "Unreachable", href: "/agent/unreachable", icon: PhoneOff },
  { name: "Shipped", href: "/agent/shipped", icon: Truck },
];

export function AgentSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-64 bg-card shadow-lg">
      <div className="p-6 border-b border-border/50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Agent Panel</h1>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 p-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent",
                    pathname === item.href ? "bg-accent text-primary font-medium" : ""
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-border/50">
        <button className="flex items-center gap-3 w-full rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-accent">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}