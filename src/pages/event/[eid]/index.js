import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_DARK_LOGO } from "@/src/config/global";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import StyledTabPanel, { tabProps } from "@/src/components/styled/StyledTabPanel";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import EventCoursePublic from "@/src/components/widgets/event/EventCoursePublic";
import EventInfoPublic from "@/src/components/widgets/event/EventInfoPublic";
import Link from "next/link";
import Policies from "@/src/components/widgets/event/Policies";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import TeamTable from "@/src/components/table/TeamTable";
import dayjs from "dayjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { setColors, colors } = useStyleContext();
  const { organization, event, team } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.eid);
  const [item, setItem] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [tab, setTab] = useState("1");

  useEffect(() => {
    setTitle("EVENT INFO");
  });

  useEffect(() => {
    if (router?.query?.eid) {
      const newEID = router.query.eid;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
      } else {
        console.warn("Invalid Event ID");
        // Redirect to 404 page.
      }
    }
  }, [router, event?.events]);

  useEffect(() => {
    if (event?.events[eid]) {
      setItem(event.events[eid]);
      setStartTime(
        dayjs(event.events[eid].registerTo).subtract(event.events[eid].checkin, "minute")
      );
      setEndTime(dayjs(event.events[eid].registerTo).add(event.events[eid].checkin, "minute"));
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary
      });
    }
  }, [eid, event?.events]);

  const handle = {
    changeTab: (e, newTab) => {
      setTab(newTab);
    }
  };

  return (
    <Box>
      <SlantBanner background={item?.banner} />
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "space-between",
          paddingInline: "10%",
          alignItems: "end",
          gap: 2
        }}
      >
        <Box sx={{ display: "flex", alignItems: "end", gap: 2 }}>
          <img
            src={item?.darkLogo}
            width={200}
            height={200}
            style={{
              borderRadius: "50%",
              outline: "2px solid rgba(245, 131, 31, 0.5)",
              objectFit: "cover",
              backgroundColor: "black"
              // outlineOffset: "2px"
            }}
          />
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" color={colors.primary}>
              {item?.name}
            </Typography>
            <Typography variant="h5" fontWeight="bold" color={colors.secondary}>
              {organization.organizations[item?.oid]?.name}
            </Typography>
          </Box>
          {/* Begin Display Social Links */}
          <Box sx={{ mb: 3 }}></Box>
          {/* End Display Social Links */}
        </Box>

        {organization.organizations[item?.oid]?.uid === user.id && (
          <Box sx={{ mb: 3 }}>
            <Button
              variant="contained"
              onClick={() => {
                router.push(`/event/${eid}/edit`);
              }}
            >
              Edit Profile
            </Button>
          </Box>
        )}
      </Box>
      <Container sx={{ mt: "100px" }}>
        {/* <Tabs
          value={tab}
          onChange={handle.changeTab}
          TabIndicatorProps={{ sx: { backgroundColor: colors.primary } }}
        >
          <Tab
            label="Info"
            {...tabProps("info")}
            sx={{ "&.Mui-selected": { color: colors.primary } }}
          />
          <Tab label="Course" {...tabProps("course")} />
        </Tabs>
        <StyledTabPanel name="info" value={0} tab={tab}>
          <EventInfoPublic
            eid={eid}
            item={item}
            startTime={startTime}
            endTime={endTime}
          />
        </StyledTabPanel>
        <StyledTabPanel name="course" value={1} tab={tab}>
          <EventCoursePublic eid={eid} />
        </StyledTabPanel> */}
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handle.changeTab}
              TabIndicatorProps={{ sx: { backgroundColor: colors.primary } }}
            >
              <Tab label="Info" value="1" sx={{ "&.Mui-selected": { color: colors.primary } }} />
              <Tab label="Course" value="2" sx={{ "&.Mui-selected": { color: colors.primary } }} />
              <Tab
                label="Participants"
                value="3"
                sx={{ "&.Mui-selected": { color: colors.primary } }}
              />
              <Tab
                label="Policies"
                value="4"
                sx={{ "&.Mui-selected": { color: colors.primary } }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <EventInfoPublic eid={eid} item={item} startTime={startTime} endTime={endTime} />
          </TabPanel>
          <TabPanel value="2">
            <EventCoursePublic eid={eid} />
          </TabPanel>
          <TabPanel value="3">
            <TeamTable
              teams={_.map(item?.participants, (val) => team.teams[val.id])}
              showMine={false}
            />
          </TabPanel>
          <TabPanel value="4">
            <Policies item={item} />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
