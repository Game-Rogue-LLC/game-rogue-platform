import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/lab";
import dayjs from "dayjs";

const DateRangePicker = ({ value, setValue }) => {
  return (
    <DateRangePicker value={value} setValue={setValue} />
  )
}

export default DateRangePicker;