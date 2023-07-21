import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";

import ArticleSidebar from "@/src/content/ArticleLayout/ArticleSidebar";
import Footer from "@/src/content/AdminLayout/Footer";
import Header from "@/src/content/AdminLayout/Header";
import Navbar from "@/src/content/AdminLayout/Navbar";
import PageContainer from "@/src/content/AdminLayout/PageContainer";
import PageHeader from "@/src/content/AdminLayout/PageHeader";
import PublicNavbar from "@/src/content/PublicLayout/Navbar";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const ArticleLayout = (props) => {
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
        <ArticleSidebar />
        <div
          style={{
            flex: 1,
            flexFlow: "column",
            display: "flex",
            justifyContent: "space-between"
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
      <ArticleLayout {...props} />
      {/* </MatchProvider> */}
    </TournamentProvider>
  );
};

export default ContextProvider;
