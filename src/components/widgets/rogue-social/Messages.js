import {
  AddComment,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Message,
  QuestionAnswer,
  Sell
} from "@mui/icons-material";
import { Badge, Box, Button, IconButton, Typography, styled, useTheme } from "@mui/material";

import { useState } from "react";

const StyledButton = styled(Button)((theme) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  position: "fixed",
  bottom: 0,
  right: 0,
  minWidth: "416px",
  fontSize: "22px",
  alignItems: "center",
  color: "white",
  zIndex: 8500
}));

const Messages = ({ count = 3 }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [chatting, setChatting] = useState(0);

  const onToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        minWidth: 416,
        zIndex: 8500
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: 2,
          borderTopRightRadius: 2,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          px: 2,
          py: 1,
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Message />
          <Typography variant="h6">Messages</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton>
            <Sell fontSize="small" />
          </IconButton>
          <IconButton>
            <QuestionAnswer fontSize="small" />
          </IconButton>
          <IconButton>
            <AddComment fontSize="small" />
          </IconButton>
          <IconButton onClick={onToggleOpen}>
            {open === true ? (
              <KeyboardDoubleArrowDown fontSize="small" />
            ) : (
              <KeyboardDoubleArrowUp fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      {open && (
        <Box sx={{ height: 400, backgroundColor: "white" }}>
          {chatting === true ? <Box></Box> : <Box></Box>}
        </Box>
      )}
    </Box>
  );
};

export default Messages;
