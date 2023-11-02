import * as React from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function ({ className, name, sx = {}, value, setValue, disabled, ...props }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        name={name}
        className={`${className}`}
        value={dayjs(value)}
        onChange={(newValue) => setValue(newValue)}
        sx={sx}
        disabled={disabled}
      />
    </LocalizationProvider>
  );
};
