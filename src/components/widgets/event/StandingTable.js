import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  useTheme
} from '@mui/material'
import _ from 'lodash';
import TeamItem from '@/src/components/item/TeamItem';
import { useTournamentContext } from '@/src/context/TournamentContext';

const StandingTable = ({ data, sortBy }) => {
  const theme = useTheme();
  const { team } = useTournamentContext();
  const sortedArray = _.sortBy(data, sortBy).reverse();
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width={50}>
            Rank
          </TableCell>
          <TableCell>
            Team Name
          </TableCell>
          <TableCell width={50}>
            Win
          </TableCell>
          <TableCell width={50}>
            Lose
          </TableCell>
          <TableCell width={50}>
            Draw
          </TableCell>
          <TableCell width={50}>
            Score
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {team?.teams && sortedArray.map((item, index) => {
          return (
            <TableRow key={"team_" + item.tid} hover sx={{ position: 'relative', cursor: 'pointer' }}>
              <TableCell className={index < 3 ? "td-border" : ""}>
                {index + 1}
              </TableCell>
              <TableCell>
                <TeamItem team={team.teams[item.tid]} sx={{ justifyContent: 'left' }} />
              </TableCell>
              <TableCell>
                {item.wins}
              </TableCell>
              <TableCell>
                {item.loses}
              </TableCell>
              <TableCell>
                {item.draws}
              </TableCell>
              <TableCell
                sx={{
                  color: theme.palette.primary.main
                }}
              >
                {item.score}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default StandingTable;