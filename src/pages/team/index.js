import { useEffect } from 'react'
import Button from '@mui/material/Button'
import {
    Box,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TableFooter,
    useTheme
} from '@mui/material'
import AdminLayout from '@/content/AdminLayout'
import { useAppContext } from '@/context/app'
import { Router, useRouter } from 'next/router'
import { useEventContext } from '@/src/context/EventContext'
import { useOrganizationContext } from '@/src/context/OrganizationContext'
import { useMatchContext } from '@/src/context/MatchContext'
import dayjs from 'dayjs';
import { useTournamentContext } from '@/src/context/TournamentContext'
import { useAuthContext } from '@/src/context/AuthContext'

const Page = (props) => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { setTitle } = useAppContext();
    const { team } = useTournamentContext();

    const handle = {
        show: (id) => {
            router.push('/team/' + id);
        }
    }

    useEffect(() => {
        setTitle('TEAMS')
    }, [])

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
                    {Object.keys(team.teams).filter((key, i) => team.teams[key].players.findIndex(val => val.id == user.id) >= 0).map((id, i) => (
                        <TableRow hover key={id} onClick={() => handle.show(id)} sx={{ cursor: 'pointer' }}>
                            <TableCell align='center'>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                                    <img src={team.teams[id].logo ?? '/GR_Letters.png'} style={{ height: '20px' }} />
                                    {team.teams[id].name}
                                </Box>
                            </TableCell>
                            <TableCell align='center'>{team.teams[id].game}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;
