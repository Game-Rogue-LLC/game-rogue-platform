import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";

import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

export default function AddCollabDialog({ aid, open, onClose }) {
  const { article } = useTournamentContext();
  const [value, setValue] = useState("");

  const onSave = () => {
    article.update(aid, {
      collabs: [...article.articles[aid].collabs, value]
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a collaborator</DialogTitle>
      <DialogContent sx={{ px: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Enter Rogue ID"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions sx={{ pb: 2, px: 2 }}>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
