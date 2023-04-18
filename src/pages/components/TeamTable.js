import {
    Box,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
} from '@mui/material'

const TeamTable = (props) => {
    const { teams, uid, handle } = props;
    return (
        <TableContainer component={Paper} variant='elevation'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>TEAM ID</TableCell>
                        <TableCell align='center'>GAME</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(teams).filter((key, i) => teams[key].players.findIndex(val => val.id == uid) >= 0).map((id, i) => (
                        <TableRow hover key={id} onClick={() => handle(id)} sx={{ cursor: 'pointer' }}>
                            <TableCell align='center'>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                    <img src={teams[id].logo ?? '/GR_Letters.png'} style={{ height: '20px' }} />
                                    {teams[id].name}
                                </Box>
                            </TableCell>
                            <TableCell align='center'>{teams[id].game}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TeamTable;