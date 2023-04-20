import { useEffect, useMemo, useState } from 'react'
import Button from '@mui/material/Button'
import {
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
import AdminLayout from '@/src/content/AdminLayout'
import { useAppContext } from '@/src/context/app'
import { useRouter } from 'next/router'
import { useMatchContext } from '@/src/context/MatchContext'
import dayjs from 'dayjs'
import { useTournamentContext } from '@/src/context/TournamentContext'

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTitle } = useAppContext();
    const { organization, event } = useTournamentContext();
    const { match } = useMatchContext();
    const [eid, setEID] = useState(router.query.event);

    useEffect(() => {
        setTitle('MATCHES')
    }, [])

    useEffect(() => {
        if (eid) {
            event.setCurrent(eid);
            organization.setCurrent(event.events[eid]?.oid);
            console.log(eid, event.events[eid]?.oid);
        }
    }, [eid, event.events])

    useEffect(() => {
        if (router.query.event) {
            setEID(router.query.event);
        }
    }, [router])

    const matchesForEID = useMemo(() => {
        return Object.keys(match.matches).filter((key, i) => match.matches[key].eid == eid);
    }, [eid, match.matches])

    return (
        <TableContainer component={Paper} variant='elevation'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>MATCH ID</TableCell>
                        <TableCell align='center'>STATUS</TableCell>
                        <TableCell align='center'>ADMIN</TableCell>
                        <TableCell align='center'>CREATED</TableCell>
                        <TableCell align='center'>CATEGORY</TableCell>
                        <TableCell align='center'>SCHEDULED</TableCell>
                        <TableCell align='center'>SOCIAL POST</TableCell>
                        <TableCell align='center'>HIGHLIGHTS</TableCell>
                        <TableCell align='center'>STREAM NOW</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        matchesForEID.length > 0
                            ?
                            matchesForEID.map((id, i) => (
                                <TableRow key={id}>
                                    <TableCell align='center'>{match.matches[id]._id || id}</TableCell>
                                    <TableCell align='center'>{match.states[match.matches[id].status].name}</TableCell>
                                    <TableCell align='center'>{match.admins[match.matches[id].admin].name}</TableCell>
                                    <TableCell align='center'>{dayjs(match.matches[id].created.toDate()).format('MMM DD')}</TableCell>
                                    <TableCell align='center'>{match.categories[match.matches[id].category].name}</TableCell>
                                    <TableCell align='center'>
                                        {
                                            match.matches[id].schedule < 2
                                                ? match.schedules[match.matches[id].schedule].name
                                                : dayjs(match.matches[id].created.toDate()).format('MMM DD, h:mm a')
                                        }
                                    </TableCell>
                                    <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                                    <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                                    <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                                </TableRow>
                            ))
                            :
                            <TableRow>
                                <TableCell align='center' colSpan={9}>
                                    NO MATCHES
                                </TableCell>
                            </TableRow>
                    }
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button
                                variant='contained'
                                onClick={() => router.push('/match/create?event=' + eid)}
                                sx={{ borderRadius: 0, color: 'white', background: 'black', ':hover': { background: theme.palette.primary.main } }}
                            >
                                CREATE MATCH
                            </Button>
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>
                            <Button
                                variant='contained'
                                sx={{ borderRadius: 0, color: 'white', background: 'black', ':hover': { background: theme.palette.primary.main } }}
                            >
                                PAST MATCHES
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;
