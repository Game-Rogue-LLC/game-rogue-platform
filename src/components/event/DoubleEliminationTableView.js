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
} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import FullCalendar from '@/src/components/FullCalendar';
import MatchTable from '@/src/components/match/MatchTable';
import { MATCH_STATES } from '@/src/config/global';
import TeamItem from '../TeamItem';

const DoubleEliminationTableView = ({ myTeam, eid, matches }) => {
  const router = useRouter();
  const theme = useTheme();
  const { organization, event, team, match } = useTournamentContext();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (event?.events[eid]) {
      let temp = [];
      event.events[eid].participants.forEach(item => {
        temp.push({
          ...team.teams[item.tid]
        });
      })
      setTeams(temp);
    }
  }, [eid, event?.events, team.teams])

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2
      }}
    >
      <Box
        sx={{ width: '300px' }}
      >
        <MenuList
          sx={{
            border: 'solid 1px rgba(255, 255, 255, 0.2)',
            padding: 0
          }}
        >
          {
            teams.map((item, i) => {
              return (
                <MenuItem
                  key={'team_' + i}
                  disableRipple
                >
                  <TeamItem team={item} sx={{ color: (item.id == myTeam ? theme.palette.primary.main : 'white') }} />&nbsp;
                  {/* <Typography variant='b1' style={{ color: (item.id == myTeam ? theme.palette.primary.main : 'white') }}>
                    {item.id == myTeam ? ' ( My Team ) ' : ''}
                  </Typography> */}
                </MenuItem>
              )
            })
          }
        </MenuList>
      </Box>
      <Box sx={{ flex: 1, zIndex: 100 }}>
        <MatchTable matches={matches} eid={eid} myTeam={myTeam} />
      </Box>
    </Box>
  )
}

export default DoubleEliminationTableView;