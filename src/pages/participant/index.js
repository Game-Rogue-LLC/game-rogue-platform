import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
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
} from '@mui/material';
import { useRouter } from 'next/router';
import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useTournamentContext } from '@/src/context/TournamentContext';

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTitle } = useAppContext();
    const { organization, event, team } = useTournamentContext();
    const [eid, setEID] = useState(null);

    useEffect(() => {
        setTitle('PARTICIPANTS');
    }, [])

    useEffect(() => {
        if (router?.query.event) {
            const newEID = router.query.event;
            setEID(newEID);
            event.setCurrent(newEID);
            organization.setCurrent(event.events[newEID].oid);
        }
    }, [router])

    const handle = {
        addParticipant: (e) => {
            router.push('/participant/create?event=' + eid);
        }
    }

    return (
        <TableContainer component={Paper} sx={{ textTransform: 'uppercase' }} variant='elevation'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>TEAM ID</TableCell>
                        <TableCell align='center'>TEAM NAME</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        event.events[eid]?.participants?.length > 0
                            ?
                            event.events[eid].participants.map((participant) => {
                                return (
                                    <TableRow key={'participant_' + participant.tid}>
                                        <TableCell align='center'>{participant.tid}</TableCell>
                                        <TableCell align='center'>{team.teams[participant.tid]?.name}</TableCell>
                                    </TableRow>
                                )
                            })
                            :
                            <TableRow>
                                <TableCell align='center' colSpan={4}>
                                    NO PARTICIPANTS
                                </TableCell>
                            </TableRow>
                    }
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button
                                variant='contained'
                                sx={{ borderRadius: 0, color: 'white', bgcolor: 'black' }}
                                onClick={handle.addParticipant}
                            >
                                ADD PARTICIPANT
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
