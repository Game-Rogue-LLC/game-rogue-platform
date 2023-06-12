import { Badge, Button, styled } from "@mui/material";

import { Message } from "@mui/icons-material";

const StyledButton = styled(Button)((theme) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  position: "fixed",
  bottom: 0,
  right: 0,
  minWidth: "416px",
  fontSize: "22px",
  alignItems: "center",
  zIndex: 8500
}));

const Messages = ({ count = 3 }) => {
  return (
    <StyledButton
      variant="contained"
      startIcon={<Message />}
      endIcon={<Badge color="error" badgeContent={count} sx={{ marginLeft: 5 }}></Badge>}
    >
      Messages
    </StyledButton>
  );
};

export default Messages;
