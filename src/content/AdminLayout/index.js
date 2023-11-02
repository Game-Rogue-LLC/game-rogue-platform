import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";

import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";
import OrganizationSidebar from "@/src/content/OrganizationSidebar";
import PageContainer from "./PageContainer";
import PageHeader from "./PageHeader";
import PublicNavbar from "@/src/content/PublicLayout/Navbar";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const AdminLayout = (props) => {
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
        <OrganizationSidebar />
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
          <PageContainer>
            <PageHeader />
            {children}
          </PageContainer>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const ContextProvider = (props) => {
  return (
    <TournamentProvider>
      {/* <MatchProvider> */}
      <AdminLayout {...props} />
      {/* </MatchProvider> */}
    </TournamentProvider>
  );
};

export default ContextProvider;
