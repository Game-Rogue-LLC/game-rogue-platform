import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

const CustomDateTimePicker = ({
  className,
  name,
  sx,
  value,
  setValue,
  disabled,
  ...props
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
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

export default CustomDateTimePicker;
