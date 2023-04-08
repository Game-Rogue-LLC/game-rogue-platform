import { useEffect } from 'react'
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
import AdminLayout from '@/content/AdminLayout'
import { useAppContext } from '@/context/app'
import { useRouter } from 'next/router'
import { useEventContext } from '@/src/context/EventContext'
import { useOrganizationContext } from '@/src/context/OrganizationContext'
import { useMatchContext } from '@/src/context/MatchContext'
import dayjs from 'dayjs'

const Page = (props) => {
    const theme = useTheme()
    const router = useRouter()
    const { setTitle } = useAppContext()
    const { setCurrent: setCurrentOrganization } = useOrganizationContext()
    const { events, current: currentEvent, setCurrent: setCurrentEvent } = useEventContext()
    const { match } = useMatchContext()
    const event = router.query?.event

    useEffect(() => {
        setTitle('MATCHES')
    }, [])

    useEffect(() => {
        setCurrentEvent(event)
        setCurrentOrganization(events[event]?.oid)
    }, [events, event])

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
                    {Object.keys(match.matches).filter((key, i) => match.matches[key].eid == currentEvent).map((id, i) => (
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
                    ))}
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button variant='contained' onClick={() => router.push('/match/create?event=' + currentEvent)}>
                                CREATE MATCH
                            </Button>
                        </TableCell>
                        <TableCell sx={{ border: 'none' }}>
                            <Button variant='contained'>
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
