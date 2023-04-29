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
import TeamItem from "@/src/components/match/TeamItem";
import dayjs from "dayjs";
import Link from "next/link";
import { MATCH_STATES } from "@/src/config/global";
import { useEffect, useMemo, useState } from "react";
import { LoadingButton } from "@mui/lab";

const MatchTable = ({ matches, eid }) => {
  const theme = useTheme();
  const { match, team } = useTournamentContext();
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    match.read(eid);
  }, [])

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
              <TableCell align='center'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && currentMatches.length > 0
              ? currentMatches.map((item, i) => (
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
                  <TableCell align='center'>
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
                    </LoadingButton>
                  </TableCell>
                </TableRow>
              ))
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