import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";

import Link from "next/link";
import _ from "lodash";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Section = ({ title, basePath, items, viewAll, onToggleViewAll }) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{ borderRadius: 2, border: "solid 1px rgba(255,255,255,.2)", p: 1 }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", py: 1 }}>
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
      <Box sx={{ py: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {_.map(items, (val, i) => (
          <Box key={`item-${i}`}>
            <Link href={basePath + "/" + val.id}>
              <Typography
                variant="body1"
                sx={{
                  fontSize: 20,
                  color: "white",
                  ":hover": { color: theme.palette.primary.main }
                }}
              >
                {val?.name}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default function Discover({}) {
  const { event, team, player } = useTournamentContext();
  const [eventShow, setEventShow] = useState(10);
  const [teamShow, setTeamShow] = useState(10);
  const [organizerShow, setOrganizerShow] = useState(10);
  const [playerShow, setPlayerShow] = useState(10);

  const events = useMemo(() => {
    const temp = _.map(event.events, (val) => val);
    if (eventShow === 0) return temp;
    return temp.slice(0, eventShow);
  }, [event, eventShow]);

  const teams = useMemo(() => {
    const temp = _.map(team.teams, (val) => val);
    if (teamShow === 0) return temp;
    return temp.slice(0, teamShow);
  }, [team, teamShow]);

  const organizers = useMemo(() => {
    const temp = _.map(player.players, (val) => val);
    if (organizerShow === 0) return temp;
    return temp.slice(0, organizerShow);
  }, [player, organizerShow]);

  const players = useMemo(() => {
    const temp = _.map(player.players, (val) => val);
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
      <Section
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
