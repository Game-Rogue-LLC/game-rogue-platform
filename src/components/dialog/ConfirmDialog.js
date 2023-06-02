import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from "@mui/material";
import { Close, Delete } from "@mui/icons-material";

import { LoadingButton } from "@mui/lab";
import { useState } from "react";

const ConfirmDialog = ({ open, comment, onAccept, onDeny }) => {
  const [deleting, setDeleting] = useState(false);

  const onDelete = async () => {
    setDeleting(true);
    await onAccept();
    setDeleting(false);
  };

  return (
    <Dialog open={open} onClose={onDeny}>
      <DialogTitle>Confirm</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{comment}</Typography>
      </DialogContent>
      <DialogActions>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row-reverse",
            gap: 1,
            px: 1,
            pb: 1
          }}
        >
          <Button variant="contained" color="error" onClick={onDeny} startIcon={<Close />}>
            Cancel
          </Button>
          <LoadingButton
            loading={deleting}
            variant="contained"
            onClick={onDelete}
            startIcon={<Delete />}
          >
            Delete
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
