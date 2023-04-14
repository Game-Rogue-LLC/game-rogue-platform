import * as React from 'react';
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

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useRouter } from 'next/router';

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTitle } = useAppContext();

    React.useEffect(() => {
        setTitle('MATCHES');
    }, [])

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
                    <TableRow>
                        <TableCell align='center'>12345</TableCell>
                        <TableCell align='center'>IN PROGRESS</TableCell>
                        <TableCell align='center'>INST1NCT</TableCell>
                        <TableCell align='center'>MAY 3</TableCell>
                        <TableCell align='center'>ROUND II</TableCell>
                        <TableCell align='center'>ONGOING</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>12346</TableCell>
                        <TableCell align='center'>COMPLETED</TableCell>
                        <TableCell align='center'>TITANE</TableCell>
                        <TableCell align='center'>MAY 1</TableCell>
                        <TableCell align='center'>ROUND I</TableCell>
                        <TableCell align='center'>May 2, 7:00pm EST</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>UPGRADE</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button variant='contained' sx={{ borderRadius: 0, color: 'white', bgcolor: 'black' }}>
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
