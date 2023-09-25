import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import { DEFAULT_DARK_LOGO } from "@/src/config/global";
import GameChip from "@/src/components/chip/GameChip";
import Image from "next/image";
import Link from "next/link";
import PlatformChip from "@/src/components/chip/PlatformChip";
import RegionChip from "@/src/components/chip/RegionChip";
import _ from "lodash";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { withOpacity } from "@/src/utils/utils";

const EventSection = ({ title, basePath, items, viewAll, onToggleViewAll }) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{ borderRadius: 2, border: "solid 1px rgba(255,255,255,.2)", overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 1
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: 24, textAlign: "center", color: theme.palette.primary.main }}
        >
          {title}
        </Typography>
        <Button variant="contained" onClick={onToggleViewAll}>
          {viewAll ? "VIEW ALL" : "VIEW LESS"}
        </Button>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {_.map(items, (val, i) => (
          <Link href={basePath + "/" + val.id}>
            <Box
              key={`item-${i}`}
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                gap: 3,
                ":hover": { backgroundColor: withOpacity(theme.palette.primary.main, 0.1) }
              }}
            >
              <Image src={val.darkLogo ?? DEFAULT_DARK_LOGO} width={60} height={60} />
              <Typography
                variant="body1"
                sx={{
                  fontSize: 20,
                  color: "white"
                }}
              >
                {val?.name}
              </Typography>
              <Typography variant="body1" sx={{ color: "white" }}>
                {val.organizer}
              </Typography>
              <GameChip />
              <PlatformChip type={val?.platform} />
              <RegionChip type={val?.region} />
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

const Section = ({ title, basePath, items, viewAll, onToggleViewAll }) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{ borderRadius: 2, border: "solid 1px rgba(255,255,255,.2)", overflow: "hidden" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: 1,
          px: 1
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontSize: 24, textAlign: "center", color: theme.palette.primary.main }}
        >
          {title}
        </Typography>
        <Button variant="contained" onClick={onToggleViewAll}>
          {viewAll ? "VIEW ALL" : "VIEW LESS"}
        </Button>
      </Box>
      <Divider />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {_.map(items, (val, i) => (
          <Link href={basePath + "/" + val.id}>
            <Box
              key={`item-${i}`}
              sx={{
                py: 1,
                px: 2,
                display: "flex",
                alignItems: "center",
                ":hover": { backgroundColor: withOpacity(theme.palette.primary.main, 0.1) }
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: 20,
                  color: "white"
                }}
              >
                {val?.name}
              </Typography>
            </Box>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default function Discover({}) {
  const { organizer, event, team, player } = useTournamentContext();
  const [eventShow, setEventShow] = useState(10);
  const [teamShow, setTeamShow] = useState(10);
  const [organizerShow, setOrganizerShow] = useState(10);
  const [playerShow, setPlayerShow] = useState(10);

  const events = useMemo(() => {
    const temp = _.map(event.events, (val) => ({
      ...val,
      organizer:
        player.players[organizer.organizers[val.oid]?.uid]?.userName ||
        player.players[organizer.organizers[val.oid]?.uid]?.name ||
        "UNKNOWN"
    }));
    if (eventShow === 0) return temp;
    return temp.slice(0, eventShow);
  }, [event, eventShow, organizer]);

  const teams = useMemo(() => {
    const temp = _.map(team.teams, (val) => val);
    if (teamShow === 0) return temp;
    return temp.slice(0, teamShow);
  }, [team, teamShow]);

  const organizers = useMemo(() => {
    const temp = _.filter(player.players, (val) => val.userName && val.name);
    if (organizerShow === 0) return temp;
    return temp.slice(0, organizerShow);
  }, [player, organizerShow]);

  const players = useMemo(() => {
    const temp = _.filter(player.players, (val) => val.userName && val.name);
    if (playerShow === 0) return temp;
    return temp.slice(0, playerShow);
  }, [player, playerShow]);

  const onToggleEventShow = () => {
    setEventShow((prev) => 10 - prev);
  };
  const onToggleTeamShow = () => {
    setTeamShow((prev) => 10 - prev);
  };
  const onToggleOrganizerShow = () => {
    setOrganizerShow((prev) => 10 - prev);
  };
  const onTogglePlayerShow = () => {
    setPlayerShow((prev) => 10 - prev);
  };

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
      <EventSection
        title="Event"
        basePath="/event"
        items={events}
        viewAll={eventShow}
        onToggleViewAll={onToggleEventShow}
      />
      <Section
        title="Team"
        basePath="/rogue-social/team"
        items={teams}
        viewAll={teamShow}
        onToggleViewAll={onToggleTeamShow}
      />
      <Section
        title="Organizer"
        basePath="/rogue-social/profile"
        items={organizers}
        viewAll={organizerShow}
        onToggleViewAll={onToggleOrganizerShow}
      />
      <Section
        title="Player"
        basePath="/rogue-social/profile"
        items={players}
        viewAll={playerShow}
        onToggleViewAll={onTogglePlayerShow}
      />
    </Box>
  );
}
