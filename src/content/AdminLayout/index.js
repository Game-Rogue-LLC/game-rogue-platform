import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";
import PageHeader from "./PageHeader";
import PageContainer from "./PageContainer";
import PublicNavbar from "@/src/content/PublicLayout/Navbar";

import OrganizationSidebar from "@/src/content/OrganizationSidebar";
import MatchProvider, { useMatchContext } from "@/src/context/MatchContext";

import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import TournamentProvider, {
  useTournamentContext,
} from "@/src/context/TournamentContext";

const AdminLayout = (props) => {
  const { children } = props;
  const { user } = useAuthContext();
  const router = useRouter();
  const { organization, event } = useTournamentContext();

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        minHeight: "100vh",
        width: "100vw",
        justifyContent: "space-between",
      }}
    >
      {/* <Header /> */}
      <PublicNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {organization.activeCount > 0 ? <OrganizationSidebar /> : <></>}
        <div
          style={{
            flex: 1,
            flexFlow: "column",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {organization.activeCount > 0 &&
            organization.current &&
            event.activeCount[organization.current] > 0 &&
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
