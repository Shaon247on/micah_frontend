"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

interface MiniCalendarProps {
  selected: Date | null;
  onSelect: (date: Date) => void;
}

export function MiniCalendar({ selected, onSelect }: MiniCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function isPast(day: number) {
    return new Date(viewYear, viewMonth, day) < today;
  }

  function isSelected(day: number) {
    return (
      selected instanceof Date &&
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === day
    );
  }

  function isToday(day: number) {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  }

  return (
    <div>
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevMonth}
          className="h-8 w-8 text-[#121F37]"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-bold text-[#121F37]">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextMonth}
          className="h-8 w-8 text-[#121F37]"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day-of-week labels */}
      <div className="mb-1 grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="py-1 text-center text-[10.5px] font-bold uppercase tracking-wider text-[#6B6B6B]"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const past = isPast(day);
          const sel = isSelected(day);
          const tod = isToday(day);

          return (
            <button
              key={day}
              type="button"
              disabled={past}
              onClick={() => !past && onSelect(new Date(viewYear, viewMonth, day))}
              className={cn(
                "aspect-square rounded-lg text-[13px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DE7B42]/50",
                sel &&
                  "bg-[#DE7B42] font-bold text-white",
                !sel &&
                  tod &&
                  "border border-[#DE7B42] text-[#DE7B42]",
                !sel &&
                  !tod &&
                  !past &&
                  "text-[#121F37] hover:bg-[#FEF0E8]",
                past && "cursor-default text-[#C4C9D4]"
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}