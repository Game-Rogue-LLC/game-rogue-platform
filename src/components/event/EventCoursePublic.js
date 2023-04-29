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
import _ from 'lodash';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import DatePicker from '@/src/components/DatePicker';
import { useMatchContext } from '@/src/context/MatchContext';
import TournamentProvider, { useTournamentContext } from '@/src/context/TournamentContext';
import { EVENT_FORMATS } from '@/src/config/global';
import { DoubleElimination, SingleElimination, Stepladder } from 'tournament-pairings';
import { nanoid } from 'nanoid';
import SingleEliminationBracket from '@/src/components/match/SingleEliminationBracket';
import DoubleEliminationBracket from '@/src/components/match/DoubleEliminationBracket';
import LadderEliminationBracket from '@/src/components/match/LadderEliminationBracket';
import ScoresDialog from '@/src/components/match/ScoresDialog';
import LadderPublicPage from '@/src/components/LadderPublicPage';
import PublicLayout from '@/src/content/PublicLayout';
import { useAuthContext } from '@/src/context/AuthContext';

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

  useEffect(() => {
    if (event?.events[eid]) {
      const { participants } = event.events[eid];
      participants.forEach(item => {
        if (team.teams[item.tid].uid == user.id) setMyTeam(item.tid);
      })
    }
  }, [eid, team?.teams, event?.events])

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
    }
  }

  return (
    <Box sx={{ overflow: 'auto', flex: 1, minHeight: '300px' }}>
      <TabContext value={tab}>
        <TabList onChange={handle.changeTab} aria-label="Tabs for games">
          <Tab label="Qualifications" value="1" />
          <Tab label="Divisions" value="2" />
        </TabList>
        <TabPanel value="1">
          {
            event?.events[eid] &&
              games && event?.events[eid]?.format == 0
              ?
              <SingleEliminationBracket matches={games} />
              :
              event?.events[eid]?.format == 1
                ?
                <DoubleEliminationBracket matches={games} />
                :
                event?.events[eid]?.format == 2
                  ?
                  <LadderPublicPage myTeam={myTeam} />
                  : <></>
          }
        </TabPanel>
        <TabPanel value="2">
          <Box sx={{ width: '100%' }}>
            123
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default EventCoursePublic;
