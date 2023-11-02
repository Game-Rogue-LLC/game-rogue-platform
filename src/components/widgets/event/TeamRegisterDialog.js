import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
  Typography
} from "@mui/material";

import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { TICKET_TYPES } from "@/src/config/global";
import Validator from "validatorjs";
import _ from "lodash";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const rules = {
  text: "required"
};

const customMessages = {
  "required.text": "Description is required"
};

const TeamRegisterDialog = ({ open, onClose, onRegister, eid }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { event, organizer } = useTournamentContext();
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors((prev) => ({
        ...prev,
        ...validator.errors.errors
      }));
      return false;
    }

    setErrors({});
    return true;
  };

  const onSave = async () => {
    if (validate({ text }, rules, customMessages) === false) return;

    setSending(true);
    const res = await onRegister({ text });
    setSending(false);
    onCloseDialog();

    if (res.code === "succeed") {
      enqueueSnackbar("Requested successfully!", { variant: "success" });
    } else if (res.code === "failed") {
      console.warn(res.message);
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  const onDescriptionChange = (e) => {
    setText(e.target.value);
  };

  const onCloseDialog = () => {
    setText("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onCloseDialog} disableScrollLock>
      <DialogTitle variant="h4" fontSize={24}>
        Request to register
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>
        <Box>
          <Typography variant="subtitle2">
            Include payment information in the description, like account name, link to the
            transaction etc.
          </Typography>
          <TextField
            error={!_.isUndefined(errors.text)}
            label="Description"
            multiline
            minRows={4}
            value={text}
            onChange={onDescriptionChange}
            helperText={errors.text || ""}
            variant="outlined"
            sx={{ mt: 1 }}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2, display: "flex", gap: 2 }}>
        <Box>
          <Link
            href={organizer?.organizers[event?.events[eid]?.oid]?.paymentAddress}
            target="_blank"
          >
            <Button variant="contained">Pay</Button>
          </Link>
        </Box>
        <LoadingButton loading={sending} variant="contained" onClick={onSave}>
          Send
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default TeamRegisterDialog;
