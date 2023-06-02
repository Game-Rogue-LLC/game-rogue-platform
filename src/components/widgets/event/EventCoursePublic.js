import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
  Tab,
  useTheme
} from "@mui/material";
import { useRouter } from "next/router";
import { LoadingButton, TabContext, TabPanel, TabList } from "@mui/lab";
import _, { isMatch } from "lodash";

import AdminLayout from "@/src/content/AdminLayout";
import { useAppContext } from "@/src/context/app";
import DatePicker from "@/src/components/datetime/DatePicker";
import { useMatchContext } from "@/src/context/MatchContext";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { EVENT_FORMATS } from "@/src/config/global";
import { DoubleElimination, SingleElimination, Stepladder } from "tournament-pairings";
import { nanoid } from "nanoid";
import SingleEliminationBracket from "@/src/components/tournament-bracket/SingleEliminationBracket";
import DoubleEliminationBracket from "@/src/components/tournament-bracket/DoubleEliminationBracket";
import LadderEliminationBracket from "@/src/components/tournament-bracket/LadderEliminationBracket";
import ScoresDialog from "@/src/components/dialog/ScoresDialog";
import PublicLayout from "@/src/content/PublicLayout";
import { useAuthContext } from "@/src/context/AuthContext";
import FullCalendar, { colors } from "@/src/components/datetime/FullCalendar";
import dayjs from "dayjs";
import EventTableView from "@/src/components/widgets/event/EventTableView";
import MatchDialog from "@/src/components/dialog/MatchDialog";
import { useStyleContext } from "@/src/context/StyleContext";

const EventCoursePublic = ({ eid }) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { colors } = useStyleContext();
  const { organization, event, team, match, matchLoading } = useTournamentContext();
  const [disabled, setDisabled] = useState(false);
  const [tab, setTab] = useState("1");
  const [myTeam, setMyTeam] = useState(null);
  const [format, setFormat] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isMatchDialogOpen, setMatchDialogOpen] = useState(false);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (event?.events[eid]) {
      if (event.events[eid].format !== format) setFormat(event.events[eid].format);
      const { participants } = event.events[eid];
      participants.forEach((item) => {
        if (team.teams[item.id].uid == user?.id) setMyTeam(item.id);
      });
    }
  }, [eid, team?.teams, event?.events]);

  useEffect(() => {
    if (match?.matches) {
      let newEvents = [],
        thisEventMatches = match.matches.filter((val) => val.eid == eid);
      if (format == 0) {
        thisEventMatches.forEach((val, i) => {
          if (val.eid != eid) return;
          newEvents.push({
            id: val.id,
            title: "",
            color: colors[0],
            start: val.start,
            end: val.end,
            startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
          });
        });
      } else if (format == 1) {
        thisEventMatches.forEach((val, i) => {
          if (val.eid != eid) return;
          newEvents.push({
            id: val.id,
            title: "",
            color: colors[0],
            start: val.start,
            end: val.end,
            startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
          });
        });
      } else if (format == 2) {
        thisEventMatches.forEach((val, i) => {
          if (val.eid != eid) return;
          newEvents.push({
            id: val.id,
            title: "",
            color: colors[0],
            start: val.start,
            end: val.end,
            startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
          });
        });
      }
      setEvents(newEvents);
    }
  }, [format, match?.matches]);

  useEffect(() => {
    if (matchLoading == false && match.matches && match.matches.length > 0) {
      const newMatches = _.sortBy(
        match.matches.filter((val) => val.eid == eid),
        ["round", "match"]
      );
      // if (event.events[eid].format == 0) {
      setMatches(newMatches);
      // } else if (event.events[eid].format === 1) {
      //   setMatches({
      //     upper: [...newMatches.filter(val => val.group == 0)],
      //     lower: [...newMatches.filter(val => val.group == 1)]
      //   })
      // }
    }
  }, [match.matches, matchLoading, eid]);

  const doubleEliminationMatches = useMemo(() => {
    return {
      upper: [...matches.filter((val) => val.group == 0)],
      lower: [...matches.filter((val) => val.group == 1)]
    };
  }, [matches]);

  const handle = {
    changeTab: (e, newTab) => {
      setTab(newTab);
    },
    edit: (e) => {
      router.push("/match/edit?event=" + eid);
    },
    partyClick: (party, partyWon) => {
      const ind = _.findIndex(
        matches,
        (val) =>
          (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round) ||
          (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      );

      if (
        ind < 0 ||
        matches[ind]?.participants?.filter((val) => (val.id ? true : false)).length < 2
      )
        return;

      if (ind >= 0) {
        setSelectedMatch(matches[ind]);
        setMatchDialogOpen(true);
      }
    },
    matchClick: (match) => {
      const ind = _.findLastIndex(matches, (val) => val.id == match.id);

      // if (ind < 0 || matches[ind]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      if (ind >= 0) {
        setSelectedMatch(matches[ind]);
        setMatchDialogOpen(true);
      }
    },
    closeMatchDialog: () => {
      setMatchDialogOpen(false);
    }
  };

  return (
    <Box sx={{ overflow: "auto", flex: 1, minHeight: "300px" }}>
      <TabContext value={tab}>
        <TabList
          onChange={handle.changeTab}
          aria-label="Tabs for games"
          TabIndicatorProps={{ sx: { backgroundColor: colors.primary } }}
        >
          <Tab
            label="Calendar View"
            value="1"
            sx={{ "&.Mui-selected": { color: colors.primary } }}
          />
          <Tab label="Table View" value="2" sx={{ "&.Mui-selected": { color: colors.primary } }} />
          {format != 2 && (
            <Tab
              label="Graphic View"
              value="3"
              sx={{ "&.Mui-selected": { color: colors.primary } }}
            />
          )}
        </TabList>
        <TabPanel value="1">
          <FullCalendar events={events} selectable={false} editable={false} />
        </TabPanel>
        <TabPanel value="2">
          {event?.events[eid] && matches && (
            <EventTableView format={format} myTeam={myTeam} eid={eid} matches={matches} />
          )}
        </TabPanel>
        {format != 2 && (
          <TabPanel value="3">
            {selectedMatch && selectedMatch.participants.length == 2 && (
              <MatchDialog
                title="Match Info"
                open={isMatchDialogOpen}
                team1={team.teams[selectedMatch?.participants[0]?.id]}
                team2={team.teams[selectedMatch?.participants[1]?.id]}
                score1={selectedMatch?.participants[0]?.score}
                score2={selectedMatch?.participants[1]?.score}
                onClose={handle.closeMatchDialog}
              />
            )}
            {event?.events[eid] &&
              matches &&
              (format == 0 ? (
                <SingleEliminationBracket
                  matches={matches}
                  handlePartyClick={handle.partyClick}
                  handleMatchClick={handle.matchClick}
                />
              ) : format == 1 ? (
                <DoubleEliminationBracket
                  matches={doubleEliminationMatches}
                  handlePartyClick={handle.partyClick}
                  handleMatchClick={handle.matchClick}
                />
              ) : (
                <></>
              ))}
          </TabPanel>
        )}
      </TabContext>
    </Box>
  );
};

export default EventCoursePublic;
