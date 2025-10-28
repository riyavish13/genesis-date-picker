"use client";

import { useState } from "react";
import { SingleDatePicker } from "./components";
import { format } from "date-fns";

const Test = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <div className="m-5 space-y-5">
      <SingleDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        footer={
          <p className="text-xs">
            Selected Date:{" "}
            {selectedDate ? format(selectedDate, "MM/dd/yyyy") : "-"}
          </p>
        }
      />
    </div>
  );
};

export default Test;
