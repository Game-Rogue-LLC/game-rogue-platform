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
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import MatchHome from "@/src/components/widgets/rogue-social/Home";
import MyCommunity from "@/src/components/widgets/rogue-social/MyCommunity";
import MyProfile from "@/src/components/widgets/rogue-social/MyProfile";
import MyTeams from "@/src/components/widgets/rogue-social/MyTeams";
import PublicLayout from "@/src/content/PublicLayout";
import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import { useRouter } from "next/router";

// import Messages from "@/lib/firestore/collections/messages";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "24px",
  justifyContent: "left",
  paddingInline: theme.spacing(5)
}));

const Page = (props) => {
  const router = useRouter();
  const [tab, setTab] = useState(router.query.tab || "0");
  const [profileTab, setProfileTab] = useState(router.query.option || "0");
  console.log(tab);

  const onTabChange = (event, newTab) => {
    setTab(newTab);
  };
  const onProfileTabChange = (e, newTab) => {
    setProfileTab(newTab);
  };

  useEffect(() => {
    if (router.query.tab && router.query.tab !== tab) setTab(router.query.tab);
    if (router.query.option && router.query.option !== profileTab)
      setProfileTab(router.query.option);
  }, [router.query]);

  useEffect(() => {
    router.replace(
      {
        pathname: router.pathname,
        query: { tab: tab, option: profileTab }
      },
      undefined,
      {
        shallow: true
      }
    );
  }, [tab, profileTab]);

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
          <TabPanel value="5" sx={{ flexGrow: 1, p: 1 }}>
            <MyCommunity />
          </TabPanel>
          <TabPanel value="6" sx={{ flexGrow: 1, p: 0 }}>
            <MyProfile tab={profileTab} onTabChange={onProfileTabChange} />
          </TabPanel>
        </TabContext>
        {/* <MessagesField /> */}
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <RogueSocialSplash />
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
