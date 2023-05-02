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

const TeamTable = ({ teams, uid, handleClick, showCreate }) => {
  const router = useRouter();

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
          {teams && Object.keys(teams).filter((key, i) => teams[key].players.findIndex(val => val.id == uid) >= 0).map((id, i) => (
            <TableRow hover key={id} onClick={() => handleClick(id)} sx={{ cursor: 'pointer' }}>
              <TableCell align='center'>
                <TeamItem team={teams[id]} />
              </TableCell>
              <TableCell align='center'>{teams[id].game}</TableCell>
            </TableRow>
          ))}
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