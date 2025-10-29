"use client";

import { useState } from "react";
import {
  DateRangePicker,
  MultipleDatePicker,
  SingleDatePicker,
} from "./components";
import { format } from "date-fns";
import { Button } from "@atomos_tech/genesis";
import { DateRange } from "react-day-picker";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
    undefined
  );
  const [multiDate, setMultiDate] = useState<Date[] | undefined>(undefined);

  return (
    <div className="m-5 space-y-5">
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
          min={3}
          max={10}
        />
      </section>
    </div>
  );
};

export default Test;
