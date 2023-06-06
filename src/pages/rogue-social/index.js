import { Box, ButtonBase, Tab, Tabs, Typography, styled } from "@mui/material";
import {
  Explore,
  Groups,
  Home,
  Man,
  Message,
  Notifications,
  People,
  Settings
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useState } from "react";

import MatchHome from "@/src/components/widgets/rogue-social/Home";
import Messages from "@/src/components/widgets/rogue-social/Messages";
import MyTeams from "@/src/components/widgets/rogue-social/MyTeams";
import PublicLayout from "@/src/content/PublicLayout";
import RightSidebar from "@/src/components/widgets/rogue-social/RightSidebar";
import TeamList from "@/src/components/list/TeamList";

// import Messages from "@/lib/firestore/collections/messages";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "24px",
  justifyContent: "left",
  paddingInline: theme.spacing(5)
}));

const Page = (props) => {
  const [tab, setTab] = useState("0");
  const [showMessages, setShowMessages] = useState(false);

  const onTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box
      sx={{
        background: "black",
        display: "flex"
      }}
    >
      <Box
        sx={{
          background: "black",
          display: "flex",
          flexGrow: 1
        }}
      >
        <TabContext value={tab}>
          <Box
            sx={{
              position: "static",
              borderRight: 1,
              borderColor: "divider"
            }}
          >
            <TabList
              onChange={onTabChange}
              orientation="vertical"
              sx={{
                width: "360px",
                height: "100%",
                background: "linear-gradient(to top,#28160c 60%,#000)"
              }}
            >
              <StyledTab
                icon={<Home fontSize="large" />}
                iconPosition="start"
                label="Home"
                value="0"
              />
              <StyledTab
                icon={<Home fontSize="large" />}
                iconPosition="start"
                label="Featured"
                value="1"
              />
              <StyledTab
                icon={<Explore fontSize="large" />}
                iconPosition="start"
                label="Discover"
                value="2"
              />
              <StyledTab
                icon={<Notifications fontSize="large" />}
                iconPosition="start"
                label="Notifications"
                value="3"
              />
              <StyledTab
                icon={<People fontSize="large" />}
                iconPosition="start"
                label="My Team"
                value="4"
              />
              <StyledTab
                icon={<Groups fontSize="large" />}
                iconPosition="start"
                label="My Community"
                value="5"
              />
              <StyledTab
                icon={<Man fontSize="large" />}
                iconPosition="start"
                label="Profile"
                value="6"
              />
              <StyledTab
                icon={<Settings fontSize="large" />}
                iconPosition="start"
                label="Settings"
                value="7"
              />
            </TabList>
          </Box>
          <TabPanel value="0" sx={{ flexGrow: 1, p: 0 }}>
            <MatchHome />
          </TabPanel>
          <TabPanel value="4" sx={{ flexGrow: 1, p: 1 }}>
            <MyTeams />
          </TabPanel>
        </TabContext>
        {/* <MessagesField /> */}
      </Box>
      <Box
        sx={{
          borderLeft: "solid 1px rgba(255,255,255,.2)",
          p: 1
        }}
      >
        <RightSidebar />
        <Messages onClick={() => {}} />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <Box
        sx={{
          backgroundColor: "black",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 9999,
          backgroundImage: "url(/rogue_social.gif)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          cursor: "pointer"
        }}
        className="rogue-social-splash"
        onClick={(e) => {
          e.currentTarget.classList.add("splash-hidden");
        }}
      >
        {/* <Box
          component="img"
          src="/rogue_social.gif"
          sx={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            top: "50vh",
            left: "50vw",
            transform: "translate(-50%, -50%)",
            zIndex: 9999
          }}
        ></Box> */}
      </Box>

      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
