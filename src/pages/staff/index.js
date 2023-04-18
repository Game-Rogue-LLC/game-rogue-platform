import { useEffect } from 'react';
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
    useTheme,
    Typography
} from '@mui/material';
import { STAFF_ROLES } from '@/src/config/global';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useOrganizationContext } from '@/src/context/OrganizationContext';
import { useRouter } from 'next/router';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { useEventContext } from '@/src/context/EventContext';

dayjs.extend(relativeTime);

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTitle } = useAppContext();
    const { organizations, current: currentOrganization, setCurrent: setCurrentOrganization } = useOrganizationContext();
    const { player } = useTournamentContext();

    const handle = {
        addStaff: (e) => {
            router.push('/staff/create?organization=' + currentOrganization);
        }
    }

    useEffect(() => {
        if (router.query.organization) {
            setCurrentOrganization(router.query.organization);
        }
    }, [router])

    useEffect(() => {
        setTitle('STAFF');
    }, [])

    return (
        <TableContainer component={Paper} variant='elevation'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>ROGUE ID</TableCell>
                        <TableCell align='center'>POSITION</TableCell>
                        <TableCell align='center'>LAST ACTIVE</TableCell>
                        <TableCell align='center'>RECENT EDIT</TableCell>
                        <TableCell align='center'>ACTIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {organizations[currentOrganization]?.staff?.length > 0
                        ? organizations[currentOrganization].staff.map((val, i) => (
                            <TableRow key={'staff_' + i}>
                                <TableCell align='center'>{player.players[val.uid]?.name + '#' + player.players[val.uid]?._id}</TableCell>
                                <TableCell align='center'>{STAFF_ROLES[val.role].name}</TableCell>
                                <TableCell align='center'>{dayjs(val.lastLogin.toDate()).fromNow()}</TableCell>
                                <TableCell align='center'>{ }</TableCell>
                                <TableCell align='center'>
                                    <Button
                                        variant='contained'
                                        sx={{
                                            background: 'black',
                                            color: 'white',
                                            ':hover': {
                                                background: theme.palette.primary.main
                                            }
                                        }}
                                    >
                                        VIEW
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        : <TableRow>
                            <TableCell align='center' colSpan={5}>
                                <Typography variant='body2' textAlign={'center'}>No data.</Typography>
                            </TableCell>
                        </TableRow>
                    }
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button
                                variant='contained'
                                sx={{
                                    borderRadius: 0,
                                    color: 'white',
                                    bgcolor: 'black'
                                }}
                                onClick={handle.addStaff}
                            >
                                ADD STAFF
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
