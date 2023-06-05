import { Badge, Button, styled } from "@mui/material";

import { Message } from "@mui/icons-material";

const StyledButton = styled(Button)((theme) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  position: "fixed",
  bottom: 0,
  right: "50px",
  minWidth: "300px",
  fontSize: "22px",
  alignItems: "center"
}));

const Messages = ({}) => {
  return (
    <StyledButton
      variant="contained"
      startIcon={<Message />}
      endIcon={<Badge color="error" badgeContent={3} sx={{ marginLeft: 5 }}></Badge>}
    >
      Messages
    </StyledButton>
  );
};

export default Messages;
