import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  event,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  useTheme,
  DialogActions
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import MatchTable from "@/src/components/table/MatchTable";
import { EVENT_STATES, MATCH_STATES } from "@/src/config/global";
import TeamItem from "@/src/components/item/TeamItem";
import FullCalendar from "@/src/components/datetime/FullCalendar";

const LadderEliminationTableView = ({ myTeam, eid, matches }) => {
  const router = useRouter();
  const theme = useTheme();
  const { organization, event, team, match } = useTournamentContext();
  const [teams, setTeams] = useState([]);
  const [rank, setRank] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [events, setEvents] = useState([]);
  const [newMatch, setNewMatch] = useState({});
  const [available, setAvailable] = useState({});
  const [rounds, setRounds] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [savingMatch, setSavingMatch] = useState(false);

  useEffect(() => {
    if (event?.events[eid]) {
      setRounds([...event.events[eid].rounds]);
      setCurrentRound(_.last(event.events[eid].rounds));
    }
  }, [event?.events, eid]);

  useEffect(() => {
    if (event?.events[eid]) {
      let temp = [];
      event.events[eid].participants.forEach((item) => {
        temp.push({
          ...team.teams[item.id]
        });
      });
      setTeams(temp);
    }
  }, [eid, event?.events, team.teams]);

  const myRank = useMemo(() => {
    if (currentRound != null) {
      return currentRound.rank[myTeam];
    }
  }, [myTeam, currentRound]);

  const canChallenge = () => {
    if (
      matches.findIndex(
        (val) =>
          (val.self == myTeam || val.opponent == myTeam) && val.status != MATCH_STATES.SCHEDULING
      ) >= 0
    ) {
      return false;
    }
    return true;
  };

  const isDisabled = (id) => {
    if (currentRound) {
      const rk = currentRound.rank[id];
      return rk < myRank - 2 || rk > myRank;
      // || (opponent && opponent != id)
      // || !available[id]
    }
    return false;
  };

  const handle = {
    prepareMatch: (e) => {
      if (events.length > 0) {
        setNewMatch(events[0]);
        setShowCalendar(false);
        setEvents([]);
      }
    },
    saveMatch: async (e) => {
      setSavingMatch(true);
      if (!newMatch?.id) {
        alert("There is nothing to save. Please choose opponent team and schedule the match.");
        setSavingMatch(false);
        return;
      }
      const res = await match.update(newMatch.id, {
        id: newMatch.id,
        eid: eid,
        self: myTeam,
        opponent: opponent,
        type: 0,
        title: newMatch.title,
        color: newMatch.color,
        end: newMatch.end,
        endStr: newMatch.endStr,
        start: newMatch.start,
        startStr: newMatch.startStr,
        createdAt: new Date(),
        status: MATCH_STATES.SCHEDULING.value,
        deleted: false
      });
      if (res.code === "succeed") {
        alert("Saved successfully!");
      }
      setSavingMatch(false);
      setOpponent(null);
    },
    openCalendar: (id) => {
      if (event.events[eid].status >= EVENT_STATES.STARTED.value) {
        alert("Can not schedule the match. Check if the event is started.");
      } else {
        setOpponent(id);
        setShowCalendar(true);
      }
    },
    closeCalendar: (e) => {
      setShowCalendar(false);
      setOpponent(null);
      setEvents([]);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2
      }}
    >
      <Dialog maxWidth={"xl"} onClose={handle.closeCalendar} open={showCalendar}>
        <DialogTitle>Schedule the challenge</DialogTitle>
        <DialogContent>
          <FullCalendar
            events={events}
            setEvents={setEvents}
            selectable={true}
            editable={true}
            limit={1}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, mb: 3 }}>
          <Button variant="contained" onClick={handle.prepareMatch}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "300px" }}>
        <MenuList
          sx={{
            border: "solid 1px rgba(255, 255, 255, 0.2)",
            padding: 0
          }}
        >
          {teams.map((item, i) => {
            return (
              <MenuItem
                key={"team_" + item.id}
                disableRipple
                disabled={myTeam !== item.id && (isDisabled(item.id) || !canChallenge())}
                onClick={(e) => {
                  if (item.id != myTeam) {
                    handle.openCalendar(item.id);
                  }
                }}
              >
                <TeamItem
                  team={item}
                  sx={{
                    color:
                      item.id == myTeam || item.id == opponent
                        ? theme.palette.primary.main
                        : "white"
                  }}
                />
                &nbsp;
                <Typography
                  variant="b1"
                  style={{
                    color:
                      item.id == myTeam || item.id == opponent
                        ? theme.palette.primary.main
                        : "white"
                  }}
                >
                  {item.id == myTeam ? " ( My Team ) " : ""}
                  {item.id == opponent ? " ( Opponent ) " : ""}
                </Typography>
              </MenuItem>
            );
          })}
        </MenuList>
        <LoadingButton
          loading={savingMatch}
          variant="contained"
          sx={{
            mt: 2
          }}
          onClick={handle.saveMatch}
        >
          Save
        </LoadingButton>
      </Box>
      <Box sx={{ flex: 1, zIndex: 100 }}>
        <MatchTable matches={matches} eid={eid} myTeam={myTeam} />
      </Box>
    </Box>
  );
};

export default LadderEliminationTableView;
