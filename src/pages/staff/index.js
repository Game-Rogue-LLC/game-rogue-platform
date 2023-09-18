import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
    useTheme
} from '@mui/material';

import AdminLayout from '@/src/content/AdminLayout';
import Button from '@mui/material/Button';
import { STAFF_ROLES } from '@/src/config/global';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAppContext } from '@/src/context/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTournamentContext } from '@/src/context/TournamentContext';

dayjs.extend(relativeTime);

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTitle } = useAppContext();
    const { organization, player } = useTournamentContext();

    const handle = {
        addStaff: (e) => {
            router.push('/staff/create?organization=' + organization.current);
        }
    }

    useEffect(() => {
        if (router.query.organization) {
            organization.setCurrent(router.query.organization);
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
                    {organization.organizations[organization.current]?.staff?.length > 0
                        ? organization.organizations[organization.current].staff.map((val, i) => (
                            <TableRow key={'staff_' + i}>
                                <TableCell align='center'>{player.players[val.uid]?.name + '@' + player.players[val.uid]?._id}</TableCell>
                                <TableCell align='center'>{STAFF_ROLES[val.role].name}</TableCell>
                                <TableCell align='center'>{dayjs(val.lastLogin.toDate()).fromNow()}</TableCell>
                                <TableCell align='center'>{ }</TableCell>
                                <TableCell align='center'>
                                    <Button variant='contained'>
                                        VIEW
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                        : <TableRow>
                            <TableCell align='center' colSpan={5}>
                                <Typography variant='body2' textAlign={'center'}>NO STAFF</Typography>
                            </TableCell>
                        </TableRow>
                    }
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button variant='contained'>
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
