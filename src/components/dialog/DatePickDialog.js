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
import CustomDateTimePicker from "@/src/components/datetime/DateTimePicker";

const DatePickDialog = ({ open, title, start, end, onStartChange, onEndChange, onSave, onClose }) => {
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