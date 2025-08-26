import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  className?: string;
  disabled?: boolean;
}

const presets = [
  {
    label: "Today",
    value: () => ({
      from: new Date(),
      to: new Date(),
    }),
  },
  {
    label: "Last 7 days",
    value: () => {
      const today = new Date();
      const sevenDaysAgo = new Date(today);
      sevenDaysAgo.setDate(today.getDate() - 7);
      return { from: sevenDaysAgo, to: today };
    },
  },
  {
    label: "Last 30 days",
    value: () => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return { from: thirtyDaysAgo, to: today };
    },
  },
  {
    label: "This month",
    value: () => {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from: firstDay, to: today };
    },
  },
  {
    label: "Last month",
    value: () => {
      const today = new Date();
      const firstDayLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from: firstDayLastMonth, to: lastDayLastMonth };
    },
  },
];

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
  disabled,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return "Select date range";
    if (!range.to) return format(range.from, "MMM dd, yyyy");
    
    if (range.from.getTime() === range.to.getTime()) {
      return format(range.from, "MMM dd, yyyy");
    }
    
    return `${format(range.from, "MMM dd")} - ${format(range.to, "MMM dd, yyyy")}`;
  };

  const handlePresetSelect = (preset: typeof presets[0]) => {
    const range = preset.value();
    onDateRangeChange?.(range);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className={cn(
            "justify-start text-left font-normal h-8 px-3 text-xs",
            !dateRange && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-3 w-3" />
          {formatDateRange(dateRange)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex">
          {/* Presets */}
          <div className="flex flex-col border-r border-border">
            <div className="p-3 pb-2">
              <h4 className="text-sm font-medium">Quick Select</h4>
            </div>
            <div className="flex flex-col gap-1 p-3 pt-0">
              {presets.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-xs h-8 font-normal"
                  onClick={() => handlePresetSelect(preset)}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Calendar */}
          <div className="p-3">
            <Calendar
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onDateRangeChange}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}