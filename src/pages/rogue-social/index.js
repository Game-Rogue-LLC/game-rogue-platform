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
  Settings,
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Welcome from "@/src/components/widgets/rogue-social/Welcome";
import MatchList from "@/src/components/widgets/rogue-social/MatchList";
import TournamentProvider from "@/src/context/TournamentContext";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "24px",
  justifyContent: "left",
  paddingInline: theme.spacing(5),
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
        display: "flex",
      }}
    >
      <TabContext value={tab}>
        <Box sx={{ borderRight: 1, borderColor: "divider" }}>
          <TabList
            onChange={onTabChange}
            orientation="vertical"
            sx={{ width: "360px" }}
          >
            <StyledTab
              icon={<Home fontSize="large" />}
              iconPosition="start"
              label="Home"
              value="0"
            />
            <StyledTab
              icon={<Message fontSize="large" />}
              iconPosition="start"
              label="My Match Chats"
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
              icon={<Home fontSize="large" />}
              iconPosition="start"
              label="Featured"
              value="4"
            />
            <StyledTab
              icon={<People fontSize="large" />}
              iconPosition="start"
              label="My Teams"
              value="5"
            />
            <StyledTab
              icon={<Groups fontSize="large" />}
              iconPosition="start"
              label="My Communities"
              value="6"
            />
            <StyledTab
              icon={<Man fontSize="large" />}
              iconPosition="start"
              label="Profile"
              value="7"
            />
            <StyledTab
              icon={<Settings fontSize="large" />}
              iconPosition="start"
              label="Settings"
              value="8"
            />
          </TabList>
        </Box>
        <TabPanel value="0" sx={{ flexGrow: 1 }}>
          <Welcome />
        </TabPanel>
        <TabPanel value="1" sx={{ flexGrow: 1 }}>
          <MatchList />
        </TabPanel>
      </TabContext>
      {/* <MessagesField /> */}
    </Box>
  );
};

Page.getLayout = (page) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);

  if (loading === true) {
    return (
      <Box
        sx={{
          backgroundColor: "black",
          position: "fixed",
          width: "100%",
          height: "100%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}
        className="rogue-social-splash"
      >
        {/* <InfinitySpin
          width='200'
          color={theme.palette.primary.main}
        /> */}
        <Box sx={{ position: "relative", zIndex: 9999 }}>
          <img src="/rogue_social.gif" />
        </Box>
      </Box>
    );
  }

  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

// Page.transition = (page) => {
//   return <RogueSocialSplash content="Loading..." />
// }

export default Page;
