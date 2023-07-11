import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useTheme
} from "@mui/material";

import { isMyArticle } from "@/src/utils/utils";
import { useAuthContext } from "@/src/context/AuthContext";

const ArticleShowDialog = ({ open, item, onClose, onEdit }) => {
  const theme = useTheme();
  const { user } = useAuthContext();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ zIndex: 10000, maxWidth: "100vw" }}
      disableScrollLock
    >
      <DialogTitle fontSize="2rem" fontWeight="bold" color={theme.palette.primary.main}>
        {item?.title}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ px: 1 }}>
          <div
            dangerouslySetInnerHTML={{
              __html: item?.text
            }}
          ></div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", alignItems: "center", gap: 2 }}>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
          {isMyArticle(item, user.id) && (
            <Button variant="contained" onClick={() => onEdit(item)}>
              Edit
            </Button>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ArticleShowDialog;
