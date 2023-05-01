import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Typography
} from "@mui/material";
import CustomDateTimePicker from "./DateTimePicker";

const DatePickDialog = (props) => {
  const { onClose, title, open, start, end, onStartChange, onEndChange, onSave } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CustomDateTimePicker value={start} setValue={onStartChange} />
          <CustomDateTimePicker value={end} setValue={onEndChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DatePickDialog;