import { useEffect, useState } from 'react'
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
} from '@mui/material'
import { useRouter } from 'next/router';
import { LoadingButton, TabContext, TabPanel, TabList } from '@mui/lab';
import _, { isMatch } from 'lodash';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import DatePicker from '@/src/components/datetime/DatePicker';
import { useMatchContext } from '@/src/context/MatchContext';
import TournamentProvider, { useTournamentContext } from '@/src/context/TournamentContext';
import { EVENT_FORMATS } from '@/src/config/global';
import { DoubleElimination, SingleElimination, Stepladder } from 'tournament-pairings';
import { nanoid } from 'nanoid';
import SingleEliminationBracket from '@/src/components/tournament-bracket/SingleEliminationBracket';
import DoubleEliminationBracket from '@/src/components/tournament-bracket/DoubleEliminationBracket';
import LadderEliminationBracket from '@/src/components/tournament-bracket/LadderEliminationBracket';
import ScoresDialog from '@/src/components/dialog/ScoresDialog';
import PublicLayout from '@/src/content/PublicLayout';
import { useAuthContext } from '@/src/context/AuthContext';
import FullCalendar, { colors } from '@/src/components/datetime/FullCalendar';
import dayjs from 'dayjs';
import EventTableView from '@/src/components/widgets/event/EventTableView';
import MatchDialog from '@/src/components/dialog/MatchDialog';

const EventCoursePublic = ({ eid }) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organization, event, team, match, matchLoading } = useTournamentContext();
  const [games, setGames] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [tab, setTab] = useState("1");
  const [myTeam, setMyTeam] = useState(null);
  const [format, setFormat] = useState(0);
  const [events, setEvents] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isMatchDialogOpen, setMatchDialogOpen] = useState(false);

  useEffect(() => {
    if (event?.events[eid]) {
      if (event.events[eid].format !== format) setFormat(event.events[eid].format);
      const { participants } = event.events[eid];
      participants.forEach(item => {
        if (team.teams[item.tid].uid == user.id) setMyTeam(item.tid);
      })
    }
  }, [eid, team?.teams, event?.events])

  useEffect(() => {
    if (match?.matches) {
      let newEvents = [];
      if (format == 0) {
        const matches = [...match.matches];
        matches.forEach((val, i) => {
          newEvents.push({
            id: val.id,
            title: '',
            color: colors[0],
            start: val.start,
            end: val.end,
            startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
          })
        })
      } else if (format == 1) {
        match.matches.forEach((val, i) => {
          newEvents.push({
            id: val.id,
            title: '',
            color: colors[0],
            start: val.start,
            end: val.end,
            startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
          })
        })
      } else if (format == 2) {
        const matches = [...match.matches];
        matches.forEach((val, i) => {
          newEvents.push({
            id: val.id,
            title: '',
            color: colors[0],
            start: val.start,
            end: val.end,
            startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
          })
        })
      }
      setEvents(newEvents);
    }
  }, [format, match?.matches])

  useEffect(() => {
    if (matchLoading == false && match.matches && match.matches.length > 0) {
      console.log('match matches', match.matches);
      const newMatches = _.sortBy(match.matches, ['round', 'match']);
      if (event.events[eid].format == 0) {
        setGames(newMatches);
      } else if (event.events[eid].format === 1) {
        setGames({
          upper: [...newMatches.filter(val => val.group == 0)],
          lower: [...newMatches.filter(val => val.group == 1)]
        })
      }
    }
  }, [match.matches, matchLoading])

  const handle = {
    changeTab: (e, newTab) => {
      setTab(newTab);
    },
    edit: (e) => {
      router.push('/match/edit?event=' + eid);
    },
    singlePartyClick: (party, partyWon) => {
      if (party.status == 'DONE') return;

      const ind = _.findLastIndex(games, (val) => (
        (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round)
        || (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      ))

      if (ind < 0 || games[ind]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      if (ind >= 0) {
        setSelectedMatch(games[ind]);
        setMatchDialogOpen(true);
      }
    },
    doublePartyClick: (party, partyWon) => {
      if (party.status === 'DONE') return;

      const indexInUpper = _.findLastIndex(games.upper, (val) => (
        (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round)
        || (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      ))
      const indexInLower = _.findLastIndex(games.lower, (val) => (
        (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round)
        || (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      ))

      if (games.upper[indexInUpper]?.participants?.filter(val => val.id ? true : false).length < 2) return;
      if (games.lower[indexInLower]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      // let newGames = { ...games }, participant = 0;
      // if (party.id === games.upper[indexInUpper]?.participants[0]?.id || party.id === games.lower[indexInLower]?.participants[0]?.id) participant = 0;
      // else if (party.id === games.upper[indexInUpper]?.participants[1]?.id || party.id === games.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        setSelectedMatch(games.upper[indexInUpper]);
        setMatchDialogOpen(true);
      }

      if (indexInLower >= 0) {
        setSelectedMatch(games.lower[indexInLower]);
        setMatchDialogOpen(true);
      }
    },
    singleMatchClick: (match) => {
      const ind = _.findLastIndex(games, (val) => val.id == match.id);

      // if (ind < 0 || games[ind]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      if (ind >= 0) {
        setSelectedMatch(games[ind]);
        setMatchDialogOpen(true);
      }
    },
    doubleMatchClick: (match) => {
      const indexInUpper = _.findLastIndex(games.upper, (val) => val.id == match.id)
      const indexInLower = _.findLastIndex(games.lower, (val) => val.id == match.id)

      // if (games.upper[indexInUpper]?.participants?.filter(val => val.id ? true : false).length < 2) return;
      // if (games.lower[indexInLower]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      // let newGames = { ...games }, participant = 0;
      // if (party.id === games.upper[indexInUpper]?.participants[0]?.id || party.id === games.lower[indexInLower]?.participants[0]?.id) participant = 0;
      // else if (party.id === games.upper[indexInUpper]?.participants[1]?.id || party.id === games.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        setSelectedMatch(games.upper[indexInUpper]);
        setMatchDialogOpen(true);
      }

      if (indexInLower >= 0) {
        setSelectedMatch(games.lower[indexInLower]);
        setMatchDialogOpen(true);
      }
    },
    closeMatchDialog: (e) => {
      setMatchDialogOpen(false);
    }
  }

  return (
    <Box sx={{ overflow: 'auto', flex: 1, minHeight: '300px' }}>
      <TabContext value={tab}>
        <TabList onChange={handle.changeTab} aria-label="Tabs for games">
          <Tab label="Calendar View" value="1" />
          <Tab label="Table View" value="2" />
          {format != 2 && <Tab label="Graphic View" value="3" />}
        </TabList>
        <TabPanel value="1">
          <FullCalendar
            events={events}
            selectable={false}
            editable={false}
          />
        </TabPanel>
        <TabPanel value="2">
          {
            event?.events[eid] && match?.matches &&
            <EventTableView format={format} myTeam={myTeam} eid={eid} matches={match.matches} />
          }
        </TabPanel>
        {
          format != 2 &&
          <TabPanel value="3">
            {selectedMatch && selectedMatch.participants.length == 2 &&
              <MatchDialog
                title="Match Info"
                open={isMatchDialogOpen}
                team1={team.teams[selectedMatch?.participants[0]?.id]}
                team2={team.teams[selectedMatch?.participants[1]?.id]}
                score1={team.teams[selectedMatch?.participants[0]?.id]?.score1}
                score2={team.teams[selectedMatch?.participants[0]?.id]?.score2}
                onClose={handle.closeMatchDialog}
              />}
            {
              event?.events[eid] && games &&
              (format == 0
                ? <SingleEliminationBracket
                  matches={games}
                  handlePartyClick={handle.singlePartyClick}
                  handleMatchClick={handle.singleMatchClick}
                />
                : format == 1
                  ? <DoubleEliminationBracket
                    matches={games}
                    handlePartyClick={handle.doublePartyClick}
                    handleMatchClick={handle.doubleMatchClick}
                  />
                  : <></>)
            }
          </TabPanel>
        }
      </TabContext>
    </Box>
  )
}

export default EventCoursePublic;
