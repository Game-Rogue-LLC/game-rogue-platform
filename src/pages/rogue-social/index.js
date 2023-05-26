import { useEffect, useState } from "react";
import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import PublicLayout from "@/src/content/PublicLayout";
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
import Welcome from "@/src/components/widgets/rogue-social/Welcome";
import MatchList from "@/src/components/widgets/rogue-social/MatchList";
import TournamentProvider from "@/src/context/TournamentContext";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "24px",
  justifyContent: "left",
  paddingInline: theme.spacing(5)
}));

const Page = (props) => {
  const [tab, setTab] = useState("0");

  const onTabChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box
      sx={{
        background: "black",
        display: "flex"
      }}>
      <Box
        sx={{
          background: "black",
          display: "flex",
          flexGrow: 1
        }}>
        <TabContext value={tab}>
          <Box sx={{ borderRight: 1, borderColor: "divider" }}>
            <TabList onChange={onTabChange} orientation="vertical" sx={{ width: "360px" }}>
              <StyledTab
                icon={<Home fontSize="large" />}
                iconPosition="start"
                label="Home"
                value="0"
              />
              <StyledTab
                icon={<Explore fontSize="large" />}
                iconPosition="start"
                label="Discover"
                value="1"
              />
              <StyledTab
                icon={<Notifications fontSize="large" />}
                iconPosition="start"
                label="Notifications"
                value="2"
              />
              <StyledTab
                icon={<Home fontSize="large" />}
                iconPosition="start"
                label="Featured"
                value="3"
              />
              <StyledTab
                icon={<People fontSize="large" />}
                iconPosition="start"
                label="My Teams"
                value="4"
              />
              <StyledTab
                icon={<Groups fontSize="large" />}
                iconPosition="start"
                label="My Communities"
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
          <TabPanel value="0" sx={{ flexGrow: 1 }}>
            <Welcome />
          </TabPanel>
        </TabContext>
        {/* <MessagesField /> */}
      </Box>
      <Box
        sx={{
          borderLeft: "solid 1px rgba(255,255,255,.2)",
          p: 1
        }}>
        <MatchList />
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
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999
        }}
        className="rogue-social-splash">
        <Box sx={{ position: "relative", zIndex: 9999 }}>
          <img src="/rogue_social.gif" />
        </Box>
      </Box>

      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
