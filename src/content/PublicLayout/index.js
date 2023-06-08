import { Box } from "@mui/material";
import Footer from "@/src/content/PublicLayout/Footer";
import Messages from "@/src/components/widgets/rogue-social/Messages";
import Navbar from "@/src/content/PublicLayout/Navbar";
import { SnackbarProvider } from "notistack";

const PublicLayout = ({ overlay, children }) => {
  return (
    <SnackbarProvider maxSnack={5}>
      <Box
        sx={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <Navbar sx={{ position: "fixed" }} />

        <Box sx={{ background: "black", flex: 1, marginTop: "67px", zIndex: 0 }}>{children}</Box>

        <Footer />
        {overlay ? overlay : <></>}
        <Messages onClick={() => {}} />
      </Box>
    </SnackbarProvider>
  );
};

export default PublicLayout;
