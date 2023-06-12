import { Box, ButtonBase, Tab, Tabs, Typography, styled } from "@mui/material";
import {
  Explore,
  Groups,
  Home,
  Man,
  Message,
  Notifications as NotificationsIcon,
  People,
  Settings as SettingsIcon
} from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import MatchHome from "@/src/components/widgets/rogue-social/Home";
import MyCommunity from "@/src/components/widgets/rogue-social/MyCommunity";
import MyProfile from "@/src/components/widgets/rogue-social/MyProfile";
import MyTeams from "@/src/components/widgets/rogue-social/MyTeams";
import Notifications from "@/src/components/widgets/rogue-social/profile/Notifications";
import PublicLayout from "@/src/content/PublicLayout";
import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import Settings from "@/src/components/widgets/rogue-social/Settings";
import _ from "lodash";
import { useRouter } from "next/router";

// import Messages from "@/lib/firestore/collections/messages";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "24px",
  justifyContent: "left",
  paddingInline: theme.spacing(5)
}));

const Page = (props) => {
  const router = useRouter();
  const { ticket } = useTournamentContext();
  const [tab, setTab] = useState(router.query.tab || "0");
  const [profileTab, setProfileTab] = useState(router.query.profileTab || "0");
  const [settingsTab, setSettingsTab] = useState(router.query.settingsTab || "0");

  const onTabChange = (event, newTab) => {
    setTab(newTab);
  };
  const onProfileTabChange = (e, newTab) => {
    setProfileTab(newTab);
  };
  const onSettingsTabChange = (e, newTab) => {
    setSettingsTab(newTab);
  };

  useEffect(() => {
    if (router.query.tab && router.query.tab !== tab) setTab(router.query.tab);
    if (router.query.profileTab && router.query.profileTab !== profileTab)
      setProfileTab(router.query.profileTab);
    if (router.query.settingsTab && router.query.settingsTab !== settingsTab)
      setSettingsTab(router.query.settingsTab);
  }, [router.query]);

  useEffect(() => {
    if (tab === "6") {
      router.replace(
        {
          pathname: router.pathname,
          query: { tab, profileTab }
        },
        undefined,
        {
          shallow: true
        }
      );
    } else if (tab === "7") {
      router.replace(
        {
          pathname: router.pathname,
          query: { tab, settingsTab }
        },
        undefined,
        {
          shallow: true
        }
      );
    } else {
      router.replace(
        {
          pathname: router.pathname,
          query: { tab }
        },
        undefined,
        {
          shallow: true
        }
      );
    }
  }, [tab, profileTab, settingsTab]);

  const notifications = useMemo(() => {
    return _.filter(ticket.tickets, (val) => _.includes(val.users, user.id));
  }, [ticket.tickets]);

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
                icon={<NotificationsIcon fontSize="large" />}
                iconPosition="start"
                label={
                  <Typography fontSize={24}>
                    Notifications
                    {notifications.length > 0 && (
                      <Badge
                        badgeContent={notifications.length}
                        color="error"
                        sx={{ ml: 2 }}
                      ></Badge>
                    )}
                  </Typography>
                }
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
                icon={<SettingsIcon fontSize="large" />}
                iconPosition="start"
                label="Settings"
                value="7"
              />
            </TabList>
          </Box>
          <TabPanel value="0" sx={{ flexGrow: 1, p: 0 }}>
            <MatchHome />
          </TabPanel>
          <TabPanel value="3" sx={{ flexGrow: 1, p: 0 }}>
            <Notifications />
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
          <TabPanel value="7" sx={{ flexGrow: 1, p: 0 }}>
            <Settings tab={settingsTab} onTabChange={onSettingsTabChange} />
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
