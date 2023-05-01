import { useTournamentContext } from "@/src/context/TournamentContext";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  useTheme,
  Typography
} from "@mui/material"
import TeamItem from "@/src/components/TeamItem";
import dayjs from "dayjs";
import Link from "next/link";
import { MATCH_STATES } from "@/src/config/global";
import { useEffect, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";

const MatchTable = ({ matches, eid, myTeam }) => {
  const theme = useTheme();
  const { match, team, event } = useTournamentContext();
  const [deleting, setDeleting] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [denying, setDenying] = useState(false);
  const [format, setFormat] = useState(0);

  useEffect(() => {
    if (event?.events[eid]) {
      setFormat(event.events[eid].format);
    }
  }, [eid, event?.events])

  useEffect(() => {
    console.log('matchtable data', matches);
  }, [matches])

  const getStatus = (status) => {
    let name = '';
    Object.keys(MATCH_STATES).forEach(key => {
      if (MATCH_STATES[key].value == status)
        name = MATCH_STATES[key].name;
    })
    return name;
  }

  const currentMatches = useMemo(() => {
    return matches.filter(val => val.status != MATCH_STATES.FINISHED.value);
  }, [matches])

  const pastMatches = useMemo(() => {
    return matches.filter(val => val.status == MATCH_STATES.FINISHED.value);
  })

  const deleteMatch = async (id) => {
    setDeleting(true);
    const res = await match.fullDelete(id);
    if (res.code === 'succeed') {
      alert('Match data deleted successfully!');
    }
    setDeleting(false);
  }
  const acceptMatchRequest = async (id) => {
    setAccepting(true);
    const res = await match.update(id, {
      status: MATCH_STATES.SCHEDULED.value
    })
    if (res.code === "succeed") {
      alert('You have accepted a challenge!');
    }
    setAccepting(false);
  }
  const denyMatchRequest = async (id) => {
    setAccepting(true);
    const res = await match.fullDelete(id);
    if (res.code === "succeed") {
      alert('You have denied a challenge!');
    }
    setAccepting(false);
  }

  const isMyMatch = (match) => {
    if (format == 0 || format == 1) {
      if (match.participants[0].id == myTeam || match.participants[1].id == myTeam) return true;
    }
    if (format == 2) {
      if (match.self == myTeam || match.opponent == myTeam) return true;
    }
    return false;
  }

  return (
    <Box>
      <Typography variant="h5">
        Current Matches
      </Typography>
      <TableContainer component={Paper} variant='elevation' sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>TEAM1</TableCell>
              <TableCell align='center'>TEAM2</TableCell>
              <TableCell align='center'>START</TableCell>
              <TableCell align='center'>END</TableCell>
              <TableCell align='center'>STATUS</TableCell>
              {format == 2 && <TableCell align='center'>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && currentMatches.length > 0
              ? currentMatches.map((item, i) => {
                if (item.participants?.length == 2 || format == 2) {
                  return (
                    <TableRow hover key={item.id} onClick={() => { }} sx={{ cursor: 'pointer' }}>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {format == 0
                          ? <TeamItem team={team?.teams[item.participants[0].id]} sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }} />
                          : format == 1
                            ? <TeamItem team={team?.teams[item.participants[0].id]} sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }} />
                            : format == 2
                              ? <TeamItem team={team?.teams[item.self]} sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }} />
                              : <></>}
                      </TableCell>
                      <TableCell align='center'>
                        {format == 0
                          ? <TeamItem team={team?.teams[item.participants[1].id]} sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }} />
                          : format == 1
                            ? <TeamItem team={team?.teams[item.participants[1].id]} sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }} />
                            : format == 2
                              ? <TeamItem team={team?.teams[item.opponent]} sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }} />
                              : <></>}
                      </TableCell>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {dayjs(item.start).format('YYYY.MM.DD')}
                      </TableCell>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {dayjs(item.end).format('YYYY.MM.DD')}
                      </TableCell>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {getStatus(item.status)}
                      </TableCell>
                      {format == 2 &&
                        <TableCell align='center'>
                          {item.self == myTeam
                            ? (item.status == MATCH_STATES.SCHEDULING.value &&
                              <LoadingButton
                                loading={deleting}
                                variant='contained'
                                size="small"
                                sx={{
                                  backgroundColor: theme.palette.error.main,
                                  color: 'white'
                                }}
                                onClick={(e) => deleteMatch(item.id)}
                              >
                                Cancel
                              </LoadingButton>)
                            : (item.opponent == myTeam && item.status == MATCH_STATES.SCHEDULING.value &&
                              <Box>
                                <LoadingButton
                                  loading={accepting}
                                  variant='contained'
                                  size="small"
                                  sx={{
                                    backgroundColor: theme.palette.error.main,
                                    color: 'white'
                                  }}
                                  onClick={(e) => acceptMatchRequest(item.id)}
                                >
                                  Accept
                                </LoadingButton>
                                <LoadingButton
                                  loading={denying}
                                  variant='contained'
                                  size="small"
                                  sx={{
                                    backgroundColor: theme.palette.error.main,
                                    color: 'white'
                                  }}
                                  onClick={(e) => denyMatchRequest(item.id)}
                                >
                                  Deny
                                </LoadingButton>
                              </Box>)}
                        </TableCell>}
                    </TableRow>
                  )
                }
              })
              : <TableRow>
                <TableCell colSpan={6} align="center">
                  NO MATCHES
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" sx={{ marginTop: 5 }}>
        Past Matches
      </Typography>
      <TableContainer component={Paper} variant='elevation' sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>TEAM1</TableCell>
              <TableCell align='center'>TEAM2</TableCell>
              <TableCell align='center'>START</TableCell>
              <TableCell align='center'>END</TableCell>
              <TableCell align='center'>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && pastMatches.length > 0
              ? pastMatches.map((item, i) => (
                <TableRow hover key={item.id} onClick={() => { }} sx={{ cursor: 'pointer' }}>
                  <TableCell align='center'>
                    <TeamItem team={team.teams[item.self]} />
                  </TableCell>
                  <TableCell align='center'>
                    <TeamItem team={team.teams[item.opponent]} />
                  </TableCell>
                  <TableCell align='center'>
                    {dayjs(item.start).format('YYYY.MM.DD')}
                  </TableCell>
                  <TableCell align='center'>
                    {dayjs(item.end).format('YYYY.MM.DD')}
                  </TableCell>
                  <TableCell align='center'>
                    {getStatus(item.status)}
                  </TableCell>
                </TableRow>
              ))
              : <TableRow>
                <TableCell colSpan={5} align="center">
                  NO MATCHES
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default MatchTable;