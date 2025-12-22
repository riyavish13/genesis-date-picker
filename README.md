# Atomos Genesis Date Picker Component Library

## Step 1: Installation

Begin by installing the Atomos Genesis Component Library via npm:

```bash
npm i @atomos_tech/genesis-datepicker
```

## Step 2: Import CSS

Import the library's CSS in your root page to apply the default styles:

```typescript
import "@atomos_tech/genesis-datepicker/style";
```

**Make sure to import it right above your global.css file to override the default colour palette!**

For example:

```typescript
import "@atomos_tech/genesis-datepicker/style";
import "./globals.css";
```

## Step 3: Set Up Theme Container

Wrap your application content within a `theme-primary` class to ensure consistent theming across your app. Add this snippet to your root or base page:

```typescript
<div className="theme-primary">{children}</div>
```

## Step 4: Configure Tailwind

You can set up the Tailwind CSS configuration in your tailwind.config.ts or tailwind.config.js and copy the theme styling below:

```
 theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          25: "var(--primary-25)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },

        // Gray Colors
        gray: {
          25: "var(--gray-25)",
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
      },
    },
  },

```

## Step 5: Define Global Styles

Add the following CSS to your `global.css` file to define the theme variables and styles:

```css
@layer base {
  :root {
    /* Theme Primary Colors */
    .theme-primary {
      --primary-25: #f5faff;
      --primary-50: #eff8ff;
      --primary-100: #d1e9ff;
      --primary-200: #b2ddff;
      --primary-300: #84caff;
      --primary-400: #53b1fd;
      --primary-500: #2e90fa;
      --primary-600: #1570ef;
      --primary-700: #175cd3;
      --primary-800: #1849a9;
      --primary-900: #194185;
    }

    /* Gray Colors */
    --gray-25: #fff;
    --gray-50: #f9fafb;
    --gray-100: #f2f4f7;
    --gray-200: #eaecf0;
    --gray-300: #d0d5dd;
    --gray-400: #98a2b3;
    --gray-500: #667085;
    --gray-600: #475467;
    --gray-700: #344054;
    --gray-800: #1d2939;
    --gray-900: #101828;
}
```

## Step 6: Usage

With the library set up, you can start using the provided components. Below are examples of how to implement the Button and Chip components.

### Import Components

Import the required components from the `@atomos_tech/genesis-datepicker` package:

```typescript
import { SingleDatePicker } from "@atomos_tech/genesis-datepicker";
```

## Example Page

Here's an example of how you might set up a simple page using the library:

```typescript
import { SingleDatePicker } from "@atomos_tech/genesis-datepicker";
import { format } from "date-fns";

export default function ExamplePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  return (
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
  );
}
```

These instructions will help you effectively integrate and utilize the `@atomos_tech/genesis-datepicker` library in your web applications, providing a consistent and visually appealing user interface.
