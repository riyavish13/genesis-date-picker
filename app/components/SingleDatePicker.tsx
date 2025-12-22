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
import { DayPicker, DropdownProps, PropsSingle } from "react-day-picker";
import { cn } from "../utils/utils";

interface DatePickerProps {
  placeholder?: string;
  selectedDate: Date | undefined;
  setSelectedDate: Dispatch<SetStateAction<Date | undefined>>;
  footer?: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  disabledCalendar?: { before: Date } | { after: Date };
  dateFormat?: string;
  disabled?: boolean;
  hideWeekdays?: boolean;
  endMonth?: Date | undefined;
  startMonth?: Date | undefined;
  timeZone?: string | undefined;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
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

    const formatSelectedDate = (date?: Date, dateFormat?: string) => {
      if (!date) return "";
      return format(date, dateFormat || "dd/MM/yyyy");
    };

    function CustomSelectDropdown(props: DropdownProps) {
      const { options, value, onChange } = props;

      const handleValueChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        if (onChange) onChange(event);
      };

      return (
        <select
          className="border p-1 shadow rounded-md mb-3 outline-none mx-1"
          value={value?.toString()}
          onChange={handleValueChange}
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

    const handleDaySelect: PropsSingle["onSelect"] = (date) => {
      if (date) {
        setSelectedDate(date);
        closePopper();
      }
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
            aria-label="Single DayPicker calendar"
          >
            <DayPicker
              mode="single"
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
              defaultMonth={selectedDate || new Date()}
              disabled={disabledCalendar}
              components={{ Dropdown: CustomSelectDropdown }}
              captionLayout="dropdown"
              timeZone={timeZone}
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

DatePicker.displayName = "DatePicker";

export default DatePicker;
