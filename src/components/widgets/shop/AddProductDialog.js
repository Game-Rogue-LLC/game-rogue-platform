import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography
} from "@mui/material";
import { useMemo, useState } from "react";

import { Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { enqueueSnackbar } from "notistack";
import { model } from "@/lib/firestore/collections/products";
import { nanoid } from "nanoid";
import { useTournamentContext } from "@/src/context/TournamentContext";

const AddProductDialog = ({ sid, open, onClose }) => {
  const { shop, product, category } = useTournamentContext();
  const [saving, setSaving] = useState(false);
  const [inputs, setInputs] = useState({ ...model });
  const [banner, setBanner] = useState(null);

  const handle = {
    save: async (e) => {
      let newProduct = {
        ...inputs,
        id: nanoid(),
        createdAt: new Date()
      };
      setSaving(true);
      let uploaded = true;

      if (banner) {
        uploaded = false;
        const res = await product.upload(banner, newProduct.id, "image");
        if (res.code === "succeed") {
          newProduct.banner = res.url;
          uploaded = true;
        }
      }

      const res1 = await product.update(newProduct.id, newProduct);

      if (res1.code === "succeed") {
        const res = await shop.update(sid, {
          products: [...shop.shops[sid].products, res1.data.id]
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
      setInputs({ ...model });
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    upload: (e, name) => {
      if (e.target.files.length === 0) return;
      const file = e.target?.files[0];
      const url = URL.createObjectURL(file);
      switch (name) {
        case "banner":
          setBanner(file);
          setInputs({
            ...inputs,
            banner: url
          });
          break;
      }
    }
  };

  const categories = useMemo(() => {
    if (shop.shops && shop.shops[sid]) {
      return _.map(shop.shops[sid].categories, (key) => category.categories[key]);
    }
    return [];
  }, [sid, shop.shops]);

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: "50%", minWidth: 400 } }}>
      <DialogTitle>
        <Typography variant="h4">Add Product</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <Box sx={{ textAlign: "center", position: "relative", mt: 3 }}>
            <IconButton sx={{ position: "absolute", right: 0, bottom: 0 }} component="label">
              <Edit />
              <input
                type="file"
                accept="image/*"
                name="upload-banner"
                id="upload-banner"
                hidden
                onChange={(e) => handle.upload(e, "banner")}
              />
            </IconButton>
            <img
              src={inputs?.banner || config.DEFAULT_CONTENTBLOCK_IMAGE}
              style={{
                height: "200px",
                maxWidth: "400px",
                width: "100%",
                objectFit: "cover",
                border: "solid 1px rgba(255, 255, 255, 0.2)",
                borderRadius: "4px"
              }}
            />
          </Box>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              name="category"
              value={inputs.category}
              label="Category"
              onChange={handle.inputs}
            >
              {categories.map((val) => (
                <MenuItem key={val.id} value={val.id}>
                  {val.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="product-name">Product Name</InputLabel>
            <OutlinedInput
              id="product-name"
              label="Product Name"
              name="name"
              value={inputs.name}
              onChange={handle.inputs}
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="price">Price</InputLabel>
            <OutlinedInput
              id="price"
              label="Price"
              name="price"
              value={inputs.price}
              onChange={handle.inputs}
              fullWidth
            />
          </FormControl>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="amount">Amount</InputLabel>
            <OutlinedInput
              id="amount"
              label="Amount"
              name="amount"
              value={inputs.amount}
              onChange={handle.inputs}
              fullWidth
            />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box sx={{ p: 2, pt: 0 }}>
          <LoadingButton loading={saving} variant="contained" onClick={handle.save}>
            Save
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
