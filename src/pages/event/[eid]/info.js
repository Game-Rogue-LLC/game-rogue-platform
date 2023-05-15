import { useState, useEffect, useMemo } from "react";
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
  Typography,
} from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import PublicLayout from "@/src/content/PublicLayout";
import { useAppContext } from "@/src/context/app";
import TournamentProvider, {
  useTournamentContext,
} from "@/src/context/TournamentContext";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from "@/src/config/global";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthContext } from "@/src/context/AuthContext";
import EventInfoPublic from "@/src/components/widgets/event/EventInfoPublic";
import EventCoursePublic from "@/src/components/widgets/event/EventCoursePublic";
import { useStyleContext } from "@/src/context/StyleContext";
import SlantBanner from "@/src/components/widgets/SlantBanner";

const Page = (props) => {
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors, buttonStyle, colors } = useStyleContext();
  const { organization, event, team, match, matchLoading } =
    useTournamentContext();
  const [eid, setEID] = useState(router?.query?.eid);
  const [item, setItem] = useState(null);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [tab, setTab] = useState("1");

  useEffect(() => {
    if (router?.query?.eid) {
      const newEID = router.query.eid;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
      } else {
        console.error("Invalid Event ID");
        // Redirect to 404 page.
      }
    }
  }, [router, event?.events]);

  useEffect(() => {
    if (event?.events[eid]) {
      setItem(event.events[eid]);
      setStartTime(
        dayjs(event.events[eid].registerTo).subtract(
          event.events[eid].checkin,
          "minute"
        )
      );
      setEndTime(
        dayjs(event.events[eid].registerTo).add(
          event.events[eid].checkin,
          "minute"
        )
      );
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary,
      });
    }
  }, [eid, event?.events]);

  const handle = {
    changeTab: (e, newTab) => {
      setTab(newTab);
    },
  };

  return (
    <Box>
      <SlantBanner background={item?.banner} />
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "left",
          paddingLeft: "10%",
          alignItems: "end",
          gap: 2,
        }}
      >
        <img
          src={item?.darkLogo}
          width={200}
          height={200}
          style={{
            // borderRadius: '50%',
            // outline: '2px solid rgba(245, 131, 31, 0.5)',
            objectFit: "cover",
            // outlineOffset: '2px'
          }}
        />
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color={colors.primary}>
            {item?.name}
          </Typography>
          <Typography variant="h5" color={colors.secondary}>
            {organization.organizations[item?.oid]?.name}
          </Typography>
        </Box>
      </Box>
      <Container sx={{ mt: "100px" }}>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handle.changeTab} aria-label="">
              <Tab label="Info" value="1" />
              <Tab label="Course" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <EventInfoPublic
              eid={eid}
              item={item}
              startTime={startTime}
              endTime={endTime}
            />
          </TabPanel>
          <TabPanel value="2">
            <EventCoursePublic eid={eid} />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <PublicLayout>
      <TournamentProvider>{page}</TournamentProvider>
    </PublicLayout>
  );
};

export default Page;
