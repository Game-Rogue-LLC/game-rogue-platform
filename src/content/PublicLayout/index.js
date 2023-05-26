import { Box } from "@mui/material";

import Navbar from "@/src/content/PublicLayout/Navbar";
import Footer from "@/src/content/PublicLayout/Footer";
import { SnackbarProvider } from "notistack";

const PublicLayout = (props) => {
  return (
    <SnackbarProvider maxSnack={5}>
      <Box
        sx={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar sx={{ position: "fixed" }} />

        <Box sx={{ background: "black", flex: 1, marginTop: "67px" }}>{props.children}</Box>

        <Footer />
      </Box>
    </SnackbarProvider>
  );
};

export default PublicLayout;
