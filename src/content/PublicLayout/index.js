import { Box, Button, Container, Typography, styled, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import Footer from "@/src/content/PublicLayout/Footer";
import Link from "next/link";
import Messages from "@/src/components/widgets/rogue-social/Messages";
import Navbar from "@/src/content/PublicLayout/Navbar";
import PrivacyNoticeDialog from "@/src/components/PrivacyNoticeDialog";
import TermsOfUseDialog from "@/src/components/TermsOfUseDialog";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.primary.main,
  borderRadius: "16px",
  ":hover": {
    backgroundColor: "#e0e0e0"
  }
}));

const PublicLayout = ({ overlay, children }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { player } = useTournamentContext();
  const [isPolicyVisible, setPolicyVisible] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);

  const onPrivacyNoticeDialogOpen = () => {
    setPrivacy(true);
  };
  const onPrivacyNoticeDialogClose = () => {
    setPrivacy(false);
  };
  const onTermsOfUseDialogOpen = () => {
    setTerms(true);
  };
  const onTermsOfUseDialogClose = () => {
    setTerms(false);
  };

  const onAccept = async () => {
    const res = await player.update(user.id, { acceptPolicy: true });
    if (res.code === "failed") console.warn(res.message);
  };
  const onDeny = () => {
    setPolicyVisible(false);
  };

  const showPolicy = useMemo(() => {
    if (user && player.players[user.id]?.acceptPolicy === true) return false;
    return true;
  }, [user, player]);

  return (
    <Box sx={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar sx={{ position: "fixed" }} />

      <Box sx={{ background: "black", flex: 1, marginTop: "67px", zIndex: 0 }}>{children}</Box>

      <Footer />
      {overlay ? overlay : <></>}
      <Messages onClick={() => {}} />

      <PrivacyNoticeDialog open={privacy} onClose={onPrivacyNoticeDialogClose} />
      <TermsOfUseDialog open={terms} onClose={onTermsOfUseDialogClose} />

      {showPolicy && isPolicyVisible && (
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            zIndex: 10000,
            backgroundColor: "rgba(0,0,0,.8)",
            backdropFilter: "blur(2px)",
            display: "flex",
            padding: 2
          }}
        >
          <Typography variant="body1">
            To help provide the best possible experience, this site uses cookies to personalize
            content, improve your browsing experience and to analyze our traffic. We may also share
            information about your use of our site with our analytics partners. Our website rules
            and procedures can be found here also.{" "}
            <u className="terms-policy-link" onClick={onPrivacyNoticeDialogOpen}>
              View our Privacy Notice
            </u>
            .{" "}
            <u className="terms-policy-link" onClick={onTermsOfUseDialogOpen}>
              View our Terms of Use
            </u>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <StyledButton variant="contained" onClick={onAccept}>
              OK
            </StyledButton>
            <StyledButton variant="contained" onClick={onDeny}>
              Cancel
            </StyledButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PublicLayout;
