"use client";

import { useState } from "react";
import {
  DateRangePicker,
  MultipleDatePicker,
  SingleDatePicker,
} from "./components";
import { format, startOfToday, subMonths } from "date-fns";
import { Button } from "@atomos_tech/genesis";
import { DateRange } from "react-day-picker";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [multiDate, setMultiDate] = useState<Date[] | undefined>(undefined);

  const applyPreset = (
    preset: "today" | "last1Months" | "last3Months" | "last6Months"
  ) => {
    let fromDate;
    const toDate = new Date(); // End date is always today

    switch (preset) {
      case "today":
        fromDate = startOfToday();
        break;
      case "last1Months":
        fromDate = subMonths(toDate, 1);
        break;
      case "last3Months":
        fromDate = subMonths(toDate, 3);
        break;
      case "last6Months":
        fromDate = subMonths(toDate, 6);
        break;
      default:
        return;
    }

    setSelectedRange({ from: fromDate, to: toDate });
  };

  return (
    <div className="m-5 min-h-screen space-y-5">
      <section className="space-y-3">
        <h1 className="text-primary-500 font-semibold text-display-xs">
          Single Date Picker
        </h1>
        <SingleDatePicker
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          position="bottom-left"
          footer={
            <p className="text-xs">
              Selected Date:{" "}
              {selectedDate ? format(selectedDate, "MM/dd/yyyy") : "-"}
            </p>
          }
        />
      </section>
      <section className="space-y-3">
        <h1 className="text-primary-500 font-semibold text-display-xs">
          Multiple Date Picker
        </h1>
        <MultipleDatePicker
          selectedDate={multiDate}
          setSelectedDate={setMultiDate}
          dateFormat="MMM dd, yyyy"
          disabledCalendar={{ after: new Date() }}
          endMonth={new Date()}
          hideWeekdays
          placeholder="Select Multiple Dates"
          startMonth={new Date(new Date().getFullYear() - 10, 12)}
          position="bottom-left"
          footer={
            <Button
              size="sm"
              fullWidth
              className="p-1"
              onClick={() => setMultiDate(undefined)}
              variant={"outlined"}
              intent={"default-outlined"}
            >
              Reset
            </Button>
          }
        />
      </section>
      <section className="space-y-3">
        <h1 className="text-primary-500 font-semibold text-display-xs">
          Date Range Picker
        </h1>
        <DateRangePicker
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          rangeFormat="MMM dd, yyyy"
          disabledCalendar={{ after: new Date() }}
          // endMonth={new Date()}
          hideWeekdays
          placeholder="Select Range"
          startMonth={new Date(new Date().getFullYear() - 10, 12)}
          position="bottom-left"
          // min={3}
          // max={10}
        />
        <h1 className="text-primary-500 font-semibold text-display-xs">
          Date Range Picker with presets
        </h1>
        <DateRangePicker
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          rangeFormat="MMM dd, yyyy"
          disabledCalendar={{ after: new Date() }}
          hideWeekdays
          placeholder="Select Range"
          startMonth={new Date(new Date().getFullYear() - 10, 12)}
          position="top-left"
        >
          {" "}
          <section className="flex flex-col gap-y-4 text-left justify-start items-start mt-5">
            <button
              className="border-none px-3 py-1 hover:bg-gray-200 rounded-xl font-semibold text-text-xs text-gray-700"
              onClick={() => applyPreset("today")}
            >
              Today
            </button>
            <button
              className="border-none px-3 py-1 hover:bg-gray-200 rounded-xl font-semibold text-text-xs text-gray-700"
              onClick={() => applyPreset("last1Months")}
            >
              Last 1 Months
            </button>
            <button
              className="border-none px-3 py-1 hover:bg-gray-200 rounded-xl font-semibold text-text-xs text-gray-700"
              onClick={() => applyPreset("last3Months")}
            >
              Last 3 Months
            </button>
            <button
              className="border-none px-3 py-1 hover:bg-gray-200 rounded-xl font-semibold text-text-xs text-gray-700"
              onClick={() => applyPreset("last6Months")}
            >
              Last 6 Months
            </button>
          </section>
        </DateRangePicker>
      </section>
    </div>
  );
};

export default Test;
