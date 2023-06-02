import { Box, Container } from "@mui/material";

import Footer from "../PublicLayout/Footer";
import PublicNavbar from "../PublicLayout/Navbar";
import SocialLeftSidebar from "./SocialLeftSidebar";
import MessagesField from "./MessagesField";
import TournamentProvider from "@/src/context/TournamentContext";

const SocialLayout = ({ children }) => {
  return (
    <Box
      sx={{
        background: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <PublicNavbar sx={{ position: "fixed" }} />
      {/* <Container sx={{ py: "50px" }}> */}
      <Box
        sx={{
          background: "black",
          display: "flex",
          marginTop: "73px",
        }}
      >
        <SocialLeftSidebar
          sx={{
            borderRight: "solid 1px rgba(255, 255, 255, .2)",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
        <MessagesField />
      </Box>
      {/* </Container> */}
      <Footer />
    </Box>
  );
};

const ContextProvider = (props) => {
  return (
    <TournamentProvider>
      {/* <MatchProvider> */}
      <SocialLayout {...props} />
      {/* </MatchProvider> */}
    </TournamentProvider>
  );
};

export default ContextProvider;
