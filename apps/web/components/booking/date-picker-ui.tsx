"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";

import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

type DatePickerUIProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function toDateKey(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function fromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const isPastDate = (date: Date) => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  return date < startOfToday;
};

const isToday = (date: Date) =>
  date.toDateString() === new Date().toDateString();

export function DatePickerUI({ value, onChange, className }: DatePickerUIProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthLabel = currentMonth.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);
    const cells: Array<{ day: number; dateKey: string; muted: boolean }> = [];

    for (let index = 0; index < firstDay; index += 1) {
      const day = prevMonthDays - firstDay + index + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      cells.push({
        day,
        dateKey: toDateKey(prevYear, prevMonth, day),
        muted: true,
      });
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      cells.push({
        day,
        dateKey: toDateKey(year, month, day),
        muted: false,
      });
    }

    return cells;
  }, [month, year]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className={cn("min-w-0", className)}>
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          aria-label="Previous month"
        >
          <Icon icon={ChevronLeft} size="sm" />
        </button>
        <p className="text-sm font-semibold text-foreground">{monthLabel}</p>
        <button
          type="button"
          onClick={goToNextMonth}
          className="flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted"
          aria-label="Next month"
        >
          <Icon icon={ChevronRight} size="sm" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-muted-foreground">
        {WEEKDAYS.map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {calendarDays.map((cell) => {
          const cellDate = fromDateKey(cell.dateKey);
          const past = isPastDate(cellDate);
          const todayCell = isToday(cellDate);
          const isSelected = value === cell.dateKey;
          const disabled = cell.muted || past;

          return (
            <button
              key={`${cell.dateKey}-${cell.muted ? "muted" : "current"}`}
              type="button"
              onClick={() => !disabled && onChange?.(cell.dateKey)}
              disabled={disabled}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-sm",
                cell.muted && "text-muted-foreground/50",
                past && "cursor-not-allowed opacity-40 text-muted-foreground",
                !disabled && !isSelected && "text-foreground hover:bg-muted",
                todayCell && !isSelected && "border border-primary",
                isSelected && "border border-primary bg-primary/5 font-semibold text-primary",
              )}
              aria-pressed={isSelected}
            >
              {cell.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
