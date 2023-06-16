import { Box, Container, Typography, useTheme } from "@mui/material";
import {
  CalendarMonthOutlined,
  LinkOutlined,
  LocationOn,
  PeopleOutline
} from "@mui/icons-material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate, isMyMatch } from "@/src/utils/utils";
import { useEffect, useMemo, useState } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import EventContainer from "@/src/components/widgets/event/EventContainer";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import StreamContainer from "@/src/components/widgets/rogue-social/profile/StreamContainer";
import dayjs from "dayjs";
import { markdownToHtml } from "@/src/utils/html-markdown";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const { setTitle } = useAppContext();
  const { setColors, colors } = useStyleContext();
  const { organization, player, event, match, team, currentTime } = useTournamentContext();
  const [oid, setOID] = useState(router?.query?.oid);
  const [item, setItem] = useState(null);

  const upcomingEventIds = useMemo(() => {
    if (organization?.organizations && event?.events) {
      return Object.keys(event.events).filter((key) =>
        dayjs(event.events[key].startAt).isAfter(currentTime)
      );
    }
    return [];
  }, [organization?.organizations, event?.events, currentTime]);

  const recentStreams = useMemo(() => {
    if (match?.matches) {
      return _.filter(
        match.matches,
        (val) =>
          val.live === true &&
          dayjs(val.end).isBefore(currentTime) &&
          isMyMatch(val, team.teams, user.id)
      );
    }
  }, [match?.matches, currentTime]);
  useEffect(() => {
    setTitle("My Organization");
  }, []);

  useEffect(() => {
    if (router?.query?.oid) {
      const newOID = router.query.oid;
      if (organization?.organizations && organization.organizations[newOID]) {
        setOID(newOID);
        organization.setCurrent(oid);
      } else {
        console.warn("Invalid Organizaiton ID");
        // Redirect to 404 page.
      }
    }
  }, [router, organization?.organizations]);

  useEffect(() => {
    if (organization?.organizations[oid]) {
      setItem(organization.organizations[oid]);
      setColors({
        primary: organization.organizations[oid].primary,
        secondary: organization.organizations[oid].secondary,
        tertiary: organization.organizations[oid].tertiary
      });
    }
  }, [oid, organization?.organizations]);

  return (
    <Box sx={{ pb: 4 }}>
      <SlantBanner background={item?.contentBlock.image} />
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "end",
            gap: 2
          }}
        >
          <img
            src={item?.darkLogo}
            width={200}
            height={200}
            style={{
              // borderRadius: '50%',
              // outline: '2px solid rgba(245, 131, 31, 0.5)',
              objectFit: "cover"
              // outlineOffset: '2px'
            }}
          />
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" color={colors.primary}>
              {item?.name}
            </Typography>
            <Typography variant="h6" color="white">
              {"#" + item?.id}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container sx={{ position: "relative" }}>
        <Box textAlign="right" sx={{ position: "absolute", top: -70, right: 30 }}>
          <CustomButton
            sx={{ paddingInline: "16px" }}
            onClick={(e) => router.push("/organization/" + oid + "/edit")}
          >
            Edit Profile
          </CustomButton>
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" sx={{ fontSize: "24px" }}>
            Description
          </Typography>
          <div
            className="html-wrapper"
            style={{ marginTop: "16px", color: "white" }}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(item?.contentBlock.text)
            }}
          ></div>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            color: "white",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleOutline />
            {item?.name}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn />
            {player.players[item?.uid]?.residency.label}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LinkOutlined />
            {item?.contentBlock.url}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthOutlined />
            {formatDate(item?.createdAt, "MMM. DD. YYYY")}
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              backgroundColor: "#140300",
              padding: 2,
              border: "solid 1px rgba(255, 255, 255, 0.2)"
            }}
          >
            <Typography
              variant="body1"
              fontWeight={700}
              fontSize={25}
              color={theme.palette.primary.main}
              textTransform="uppercase"
            >
              UPCOMING EVENTS
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2
            }}
          >
            <EventContainer events={upcomingEventIds?.map((eid) => event?.events[eid])} />
          </Box>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              backgroundColor: "#140300",
              padding: 2,
              border: "solid 1px rgba(255, 255, 255, 0.2)"
            }}
          >
            <Typography
              variant="body1"
              fontWeight={700}
              fontSize={25}
              color={theme.palette.primary.main}
              textTransform="uppercase"
            >
              RECENT STREAMS
            </Typography>
          </Box>
          <Box sx={{ mt: 2 }}>
            <StreamContainer streams={recentStreams} />
          </Box>
        </Box>
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
