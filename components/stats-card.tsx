import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  previousValue: number;
  trend: 'increase' | 'decrease';
  prefix?: string;
}

export function StatsCard({ title, value, previousValue, trend, prefix = '' }: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 bg-gradient-to-br from-card to-accent">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-primary">
            {prefix}{value.toLocaleString()}
          </p>
          <div className="flex items-center gap-2">
            {trend === 'increase' ? (
              <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
            ) : (
              <ArrowDownIcon className="h-4 w-4 text-rose-500" />
            )}
            <p className="text-sm text-muted-foreground">
              {prefix}{previousValue.toLocaleString()} was yesterday
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}