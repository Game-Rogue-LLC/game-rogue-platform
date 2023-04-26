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
import { useTournamentContext } from '@/src/context/TournamentContext';
import { EVENT_FORMATS } from '@/src/config/global';
import { DoubleElimination, SingleElimination, Stepladder } from 'tournament-pairings';
import { nanoid } from 'nanoid';
import SingleEliminationBracket from '@/src/components/match/SingleEliminationBracket';
import DoubleEliminationBracket from '@/src/components/match/DoubleEliminationBracket';
import LadderEliminationBracket from '@/src/components/match/LadderEliminationBracket';
import DemoFullCalendar from '@/src/components/DemoFullCalendar/index.js';
import ScoresDialog from '@/src/components/match/ScoresDialog';

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event, team, match, matchLoading } = useTournamentContext();
  const [games, setGames] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [eid, setEID] = useState(router?.query.eid);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTitle('MATCHES');
  }, [])

  useEffect(() => {
    if (router?.query?.eid) {
      const newEID = router.query.eid;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
        match.read(newEID);
      } else {
        console.error('Invalid Event ID');
        // Redirect to 404 page.
      }
    }
  }, [router])

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
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box sx={{ border: `solid 1px rgba(255, 255, 255, 0.2)`, borderRadius: '4px', padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant='h5'>
              Event Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Name:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {event?.events[eid]?.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Format:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {EVENT_FORMATS[event?.events[eid]?.format].name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Seeding:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {event?.events[eid]?.seeding ? 'Random' : 'Manual'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Participants:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {event?.events[eid]?.participantsCount}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ overflow: 'auto', flex: 1, border: 'solid 1px rgba(255, 255, 255, 0.2)', minHeight: '300px', borderRadius: '4px' }}>
            <TabContext value={tab}>
              <TabList onChange={handle.changeTab} aria-label="Tabs for games">
                <Tab label="Qualifications" />
                <Tab label="Divisions" />
              </TabList>
              <TabPanel value={0}>
                {
                  event?.events[eid] &&
                    games && event?.events[eid]?.format == 0
                    ?
                    <SingleEliminationBracket matches={games} handlePartyClick={() => { }} />
                    :
                    event?.events[eid]?.format == 1
                      ?
                      <DoubleEliminationBracket matches={games} handlePartyClick={() => { }} />
                      :
                      <></>
                }
              </TabPanel>
              <TabPanel value={1}>
                <Box sx={{ width: '100%' }}>
                  123
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
