import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";

import Footer from "@/src/content/AdminLayout/Footer";
import OrganizerSidebar from "./OrganizerSidebar";
import PageContainer from "./PageContainer";
import PublicNavbar from "@/src/content/PublicLayout/Navbar";
import Navbar from "../AdminLayout/Navbar";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const OrganizerLayout = (props) => {
  const { children } = props;
  const { user } = useAuthContext();
  const router = useRouter();
  const { organizer, event } = useTournamentContext();

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        minHeight: "100vh",
        width: "100vw",
        justifyContent: "space-between"
      }}
    >
      {/* <Header /> */}
      <PublicNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1
        }}
      >
        <OrganizerSidebar />
        <div
          style={{
            flex: 1,
            flexFlow: "column",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {organizer.activeCount(user?.id) > 0 &&
            organizer.current &&
            event.activeCount[organizer.current] > 0 &&
            event.current && <Navbar />}
          <PageContainer>{children}</PageContainer>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const ContextProvider = (props) => {
  return (
    <TournamentProvider>
      <OrganizerLayout {...props} />
    </TournamentProvider>
  );
};

export default ContextProvider;
