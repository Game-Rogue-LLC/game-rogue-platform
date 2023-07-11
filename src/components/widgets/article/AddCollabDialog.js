import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField
} from "@mui/material";

import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

export default function AddCollabDialog({ aid, open, onClose }) {
  const { article, player } = useTournamentContext();
  const [value, setValue] = useState("");
  const [error, setError] = useState(null);

  const onSave = () => {
    const id = _.findKey(player.players, (val) => val._id === value);
    if (id) {
      setError(null);
      article.update(aid, {
        collabs: [...article.articles[aid].collabs, id]
      });
      onClose();
    } else {
      setError("Invalid Rogue ID");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a collaborator</DialogTitle>
      <DialogContent sx={{ px: 2 }}>
        <TextField
          error={error !== null}
          variant="outlined"
          placeholder="Enter Rogue ID"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
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
