import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";

import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const AddCategoryDialog = ({ sid, open, onClose }) => {
  const { shop, category } = useTournamentContext();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  const onNameChange = (e) => {
    setName(e.target.value);
  };

  const onSave = async (e) => {
    setSaving(true);
    const res1 = await category.create({ name, sid, deleted: false, createdAt: new Date() });
    if (res1.code === "succeed") {
      const res = await shop.update(sid, {
        categories: [...shop.shops[sid].categories, res1.data.id]
      });
      if (res.code === "succeed") {
        enqueueSnackbar("Saved successfully", { variant: "success" });
      } else {
        enqueueSnackbar(res.message, { variant: "error" });
      }
    } else {
      enqueueSnackbar(res1.message, { variant: "error" });
    }

    setSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: "50%", minWidth: 400 } }}>
      <DialogTitle>
        <Typography variant="h4">Add Category</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="category-name">Category Name</InputLabel>
            <OutlinedInput
              id="category-name"
              label="Category Name"
              value={name}
              onChange={onNameChange}
              fullWidth
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ p: 2, pt: 0 }}>
          <LoadingButton loading={saving} variant="contained" onClick={onSave}>
            Save
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddCategoryDialog;
