"use client";
import { Input } from "@atomos_tech/genesis";
import { RiCalendarLine } from "@remixicon/react";
import { format } from "date-fns";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from "react";
import { DayPicker, DropdownProps, PropsMulti } from "react-day-picker";
import { cn } from "../utils/utils";

interface MultipleDatePickerProps {
  placeholder?: string;
  selectedDate: Date[] | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date[] | undefined>>;
  footer?: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  disabledCalendar?: { before: Date } | { after: Date };
  dateFormat?: string;
  disabled?: boolean;
  hideWeekdays?: boolean;
  endMonth?: Date | undefined;
  startMonth?: Date | undefined;
  timeZone?: string | undefined;
  max?: number | undefined;
  min?: number | undefined;
}

const MultipleDatePicker = forwardRef<
  HTMLInputElement,
  MultipleDatePickerProps
>(
  (
    {
      placeholder = "DD/MM/YYYY",
      selectedDate,
      setSelectedDate,
      footer,
      position = "bottom-right",
      disabledCalendar,
      dateFormat,
      disabled,
      hideWeekdays,
      endMonth,
      startMonth,
      timeZone = "Asia/Kolkata",
      min,
      max,
    },
    ref
  ) => {
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    const popperRef = useRef<HTMLDivElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
      null
    );

    const closePopper = () => setIsPopperOpen(false);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          popperElement &&
          !popperElement.contains(event.target as Node) &&
          !popperRef.current?.contains(event.target as Node)
        ) {
          closePopper();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [popperElement]);

    const formatSelectedDate = (dates?: Date[], dateFormat?: string) => {
      if (!dates || dates.length === 0) return "";
      return dates.map((d) => format(d, dateFormat || "dd/MM/yyyy")).join(", ");
    };

    function CustomSelectDropdown(props: DropdownProps) {
      const { options, value, onChange } = props;

      return (
        <select
          className="border p-1 shadow rounded-md mb-3 outline-none mx-1"
          value={value?.toString()}
          onChange={(e) => onChange?.(e)}
        >
          {options?.map((option) => (
            <option
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    const handleDaySelect: PropsMulti["onSelect"] = (date) => {
      if (date) setSelectedDate(date);
    };

    return (
      <div className="relative w-full">
        <div ref={popperRef}>
          <Input
            type="text"
            readOnly
            ref={ref}
            className="w-full main-shadow"
            placeholder={placeholder || format(new Date(), "dd/mm/yyyy")}
            aria-label="Pick a date"
            value={formatSelectedDate(selectedDate, dateFormat)}
            onClick={() => setIsPopperOpen(true)}
            disabled={disabled}
            startIcon={<RiCalendarLine size={16} />}
          />
        </div>

        {isPopperOpen && (
          <div
            tabIndex={-1}
            className={cn(
              "text-[16px] shadow-sm border border-primary-600 bg-white rounded-md",
              "mt-1 mx-auto z-[1000] transition-all absolute duration-75 delay-100 ease-in-out",
              {
                "bottom-11 right-0": position === "top-right",
                "bottom-11 left-0": position === "top-left",
                "top-10 right-0": position === "bottom-right" || !position,
                "top-10 left-0": position === "bottom-left",
              }
            )}
            ref={(element) => setPopperElement(element)}
            role="dialog"
            aria-label="Multiple DayPicker calendar"
          >
            <DayPicker
              mode="multiple"
              hideNavigation
              hideWeekdays={hideWeekdays}
              showOutsideDays
              startMonth={startMonth}
              endMonth={
                endMonth
                  ? endMonth
                  : new Date(new Date().getFullYear() + 100, 12)
              }
              selected={selectedDate}
              timeZone={timeZone}
              max={max}
              min={min}
              defaultMonth={selectedDate?.[0] || new Date()}
              disabled={disabledCalendar}
              components={{ Dropdown: CustomSelectDropdown }}
              captionLayout="dropdown"
              onSelect={handleDaySelect}
              modifiersStyles={{
                selected: {
                  backgroundColor: "var(--primary-500)",
                  color: "white",
                  borderRadius: "5px",
                },
              }}
              footer={footer}
            />
          </div>
        )}
      </div>
    );
  }
);

MultipleDatePicker.displayName = "MultipleDatePicker";

export default MultipleDatePicker;
