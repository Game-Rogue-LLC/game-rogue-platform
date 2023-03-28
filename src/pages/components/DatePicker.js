import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const CustomDatePicker = (props) => {
    const { className, name, sx, value, setValue } = props;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                name={name}
                className={`${className}`}
                value={dayjs(value)}
                onChange={newValue => setValue(newValue)}
                sx={sx}
            />
        </LocalizationProvider>
    )
}

export default CustomDatePicker;