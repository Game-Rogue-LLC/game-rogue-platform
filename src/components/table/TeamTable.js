import {
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from '@mui/material'
import TeamItem from '@/src/components/item/TeamItem';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const TeamTable = ({ teams, uid, handleClick, showCreate }) => {
  const router = useRouter();

  const myTeams = useMemo(() => {
    return Object.keys(teams).filter((key, i) => teams[key].players.findIndex(val => val.id == uid) >= 0);
  })

  const handleCreate = (e) => {
    router.push('/team/create');
  }
  return (
    <TableContainer component={Paper} variant='elevation'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>TEAM NAME</TableCell>
            <TableCell align='center'>GAME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(myTeams && myTeams.length > 0)
            ? myTeams.map((id, i) => (
              <TableRow hover key={id} onClick={() => handleClick(id)} sx={{ cursor: 'pointer' }}>
                <TableCell align='center'>
                  <TeamItem team={teams[id]} />
                </TableCell>
                <TableCell align='center'>{teams[id].game}</TableCell>
              </TableRow>
            ))
            : <TableRow>
              <TableCell align='center' colSpan={2}>
                No Teams
              </TableCell>
            </TableRow>}
          {showCreate && <TableRow>
            <TableCell colSpan={2}>
              <Button variant='contained' onClick={handleCreate}>
                Create
              </Button>
            </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TeamTable;