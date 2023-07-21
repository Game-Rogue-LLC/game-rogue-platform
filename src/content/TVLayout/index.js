import { Box } from "@mui/material";
import Footer from "@/src/content/PublicLayout/Footer";
import Navbar from "@/src/content/TVLayout/Navbar";

const TVLayout = ({ overlay, children }) => {
  return (
    <Box sx={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar sx={{ position: "fixed" }} />

      <Box sx={{ background: "black", flex: 1, marginTop: "67px", zIndex: 0 }}>{children}</Box>

      <Footer />
      {overlay ? overlay : <></>}
    </Box>
  );
};

export default TVLayout;
