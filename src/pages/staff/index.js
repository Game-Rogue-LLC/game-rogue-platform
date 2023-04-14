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

const Page = (props) => {
    const theme = useTheme();
    const { setTitle } = useAppContext();

    React.useEffect(() => {
        setTitle('STAFF');
    }, [])

    return (
        <TableContainer component={Paper} sx={{ textTransform: 'uppercase' }} variant='elevation'>
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
                        <TableCell align='center'>Inst1nct</TableCell>
                        <TableCell align='center'>may 3</TableCell>
                        <TableCell align='center'>round ii</TableCell>
                        <TableCell align='center'>ongoing</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>upgrade</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>upgrade</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>upgrade</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>12346</TableCell>
                        <TableCell align='center'>completed</TableCell>
                        <TableCell align='center'>titane</TableCell>
                        <TableCell align='center'>may 1</TableCell>
                        <TableCell align='center'>round i</TableCell>
                        <TableCell align='center'>may 2, 7:00pm est</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>upgrade</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>upgrade</TableCell>
                        <TableCell align='center' sx={{ color: '#F5831F' }}>upgrade</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button variant='contained' sx={{ borderRadius: 0, color: 'white', bgcolor: 'black' }}>
                                PAST STAFF
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
