import { useState } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControlLabel,
  FormHelperText,
  TextField,
  Typography,
  styled
} from "@mui/material";
import AccountInfo from "@/src/components/widgets/rogue-social/profile/AccountInfo";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  fontSize: "16px",
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));

const Account = () => {
  const { player } = useTournamentContext();
  const { user } = useAuthContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onDeleteAccount = (e) => {
    player.delete(user.id);
  };
  const onCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onSavePassword = (e) => {};

  return (
    <Box sx={{ borderRadius: 0 }}>
      <Accordion disableGutters>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="account-information-content"
          id="account-information-header"
        >
          <Typography variant="h6">Account Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ padding: 2 }}>
            <AccountInfo item={player.players[user.id]} />
          </Box>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="change-password-content"
          id="change-password-header"
        >
          <Typography variant="h6">Change Password</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container>
            <Box>
              <TextField
                placeholder="Current Password"
                value={currentPassword}
                onChange={onCurrentPasswordChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                placeholder="Password"
                value={password}
                onChange={onPasswordChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <TextField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                fullWidth
              />
            </Box>
            <Box sx={{ mt: 1 }}>
              <Button variant="contained" onClick={onSavePassword}>
                Save
              </Button>
            </Box>
          </Container>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="delete-account-content"
          id="delete-account-header"
        >
          <Typography variant="h6">Delete Account</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button variant="contained" onClick={onDeleteAccount}>
            Delete Account
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default Account;
