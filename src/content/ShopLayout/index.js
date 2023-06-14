import { Box } from "@mui/material";
import Footer from "@/src/content/PublicLayout/Footer";
import Navbar from "@/src/content/PublicLayout/Navbar";
import Splash from "@/src/content/Splash";

const ShopLayout = ({ children }) => {
  return (
    <Box sx={{ background: "black", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar sx={{ position: "fixed" }} />

      <Box
        sx={{
          position: "relative",
          display: "grid",
          background: "black",
          flex: 1,
          marginTop: "67px",
          zIndex: 0
        }}
      >
        {children}
      </Box>

      <Footer />
    </Box>
  );
};

export default ShopLayout;
