"use client";
import { Button, Input } from "@atomos_tech/genesis";
import { RiCalendarLine } from "@remixicon/react";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  DateRange,
  DayPicker,
  DropdownProps,
  PropsRange,
} from "react-day-picker";
import { cn } from "../utils/utils";
import { format } from "date-fns";

interface DateRangePickerProps {
  selectedRange?: DateRange | undefined;
  setSelectedRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  handleRangeSelect?: (range: DateRange | undefined) => void;
  handleApply?: () => void;
  handleReset?: () => void;
  disabled?: boolean;
  disabledCalendar?: { before: Date } | { after: Date };
  children?: ReactNode;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  apply?: boolean;
  hideWeekdays?: boolean;
  endMonth?: Date | undefined;
  startMonth?: Date | undefined;
  timeZone?: string | undefined;
  rangeFormat?: string;
  placeholder?: string;
  max?: number | undefined;
  min?: number | undefined;
}

const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      selectedRange,
      setSelectedRange,
      handleRangeSelect,
      disabledCalendar,
      position = "bottom-right",
      children,
      handleApply,
      apply,
      handleReset = () => {
        setSelectedRange(undefined);
      },
      placeholder,
      rangeFormat,
      disabled,
      endMonth,
      hideWeekdays,
      startMonth,
      timeZone = "Asia/Kolkata",
      max,
      min,
    },
    ref
  ) => {
    const [isPopperOpen, setIsPopperOpen] = useState(false);

    const popperRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => popperRef.current!);

    const formatDateRange = (rangeFormat: string, range?: DateRange) => {
      if (!range?.from) return "";
      if (!range.to) return format(range.from, rangeFormat) + " - ";
      return `${format(range.from, rangeFormat)} - ${format(
        range.to,
        rangeFormat
      )}`;
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!popperRef.current?.contains(event.target as Node)) {
          setIsPopperOpen(false);
        }
      };

      if (isPopperOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isPopperOpen]);

    const handleButtonClick = () => setIsPopperOpen(true);

    function CustomSelectDropdown(props: DropdownProps) {
      const { options, value, onChange } = props;

      const handleValueChange = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        if (onChange) {
          onChange(event);
        }
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

    const handleRangeSelectInternal: PropsRange["onSelect"] = (range) => {
      if (range?.from) {
        setSelectedRange((prevRange) => ({
          from: range.from,
          to: prevRange?.to ?? undefined,
        }));
      }

      if (range?.to) {
        setSelectedRange({
          from: range.from ?? undefined,
          to: range.to,
        });
      }

      if (handleRangeSelect) {
        handleRangeSelect(range);
      }
    };

    const handleApplyClick = () => {
      if (selectedRange?.from && selectedRange.to) {
        handleApply?.();
        setIsPopperOpen(false);
      }
    };

    return (
      <div className="relative w-full">
        <div ref={popperRef}>
          <Input
            type="text"
            startIcon={<RiCalendarLine size={16} />}
            placeholder={placeholder ?? "DD/MM/YYYY - DD/MM/YYYY"}
            className="main-shadow w-full"
            readOnly
            disabled={disabled}
            value={formatDateRange(rangeFormat ?? "dd/MM/yyyy", selectedRange)}
            onClick={handleButtonClick}
          />
        </div>
        {isPopperOpen && (
          <div
            className={cn(
              "shadow-md rounded-md border border-primary-600 p-3 flex gap-5 justify-center items-start",
              "mt-1 h-[330px] absolute bg-white z-[1000] transition-all duration-75 delay-100 ease-in-out",
              position === "top-left" && "bottom-11 left-0",
              position === "top-right" && "bottom-11 right-0",
              position === "bottom-left" && "top-10 left-0",
              position === "bottom-right" && "top-10 right-0"
            )}
            ref={popperRef}
            aria-label="Date Range Picker"
          >
            {children && (
              <div className="flex flex-col whitespace-nowrap items-start h-full border-r border-gray-200 pr-2">
                {children}
              </div>
            )}
            <div className="flex flex-col h-full justify-between">
              <DayPicker
                mode="range"
                selected={selectedRange}
                onSelect={handleRangeSelectInternal}
                showOutsideDays
                disabled={disabledCalendar}
                components={{ Dropdown: CustomSelectDropdown }}
                hideNavigation
                hideWeekdays={hideWeekdays}
                timeZone={timeZone}
                startMonth={startMonth}
                endMonth={
                  endMonth
                    ? endMonth
                    : new Date(new Date().getFullYear() + 100, 12)
                }
                max={max}
                min={min}
                captionLayout="dropdown"
                modifiersStyles={{
                  selected: {
                    backgroundColor: "var(--primary-600)",
                    borderRadius: "5px",
                  },
                  range_middle: {
                    borderRadius: "0px",
                    backgroundColor: "var(--primary-200)",
                    color: "black",
                  },
                  range_start: {
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "0px",
                    borderBottomLeftRadius: "5px",
                    borderBottomRightRadius: "0px",
                  },
                  range_end: {
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "5px",
                    borderBottomLeftRadius: "0px",
                    borderBottomRightRadius: "5px",
                  },
                }}
              />
              <div className="flex justify-between pt-2 border-t border-gray-200 gap-3">
                <Button
                  variant="outlined"
                  className="border-none py-1 px-2 text-sm"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                {apply && (
                  <Button
                    className="py-1 px-2 text-sm"
                    onClick={handleApplyClick}
                  >
                    Apply
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";

export default DateRangePicker;
