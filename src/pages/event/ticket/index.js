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

import AdminLayout from '@/content/AdminLayout';
import { AppContext } from '@/context/app';

const Page = (props) => {
	const theme = useTheme();
    const { setTitle } = React.useContext(AppContext);

    React.useEffect(() => {
        setTitle('TICKETS');
    })

	return (
        <TableContainer component={Paper} variant='elevation'>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>TICKET ID</TableCell>
                        <TableCell align='center'>STATUS</TableCell>
                        <TableCell align='center'>ADMIN</TableCell>
                        <TableCell align='center'>CREATED</TableCell>
                        <TableCell align='center'>ROGUE ID</TableCell>
                        <TableCell align='center'>ISSUE</TableCell>
                        <TableCell align='center'>LAST OPENED</TableCell>
                        <TableCell align='center'>NEW MESSAGES</TableCell>
                        <TableCell align='center'>URGENT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align='center'>12345</TableCell>
                        <TableCell align='center'>OPEN</TableCell>
                        <TableCell align='center'>INST1NCT</TableCell>
                        <TableCell align='center'>MAY 3</TableCell>
                        <TableCell align='center'>Mack#1256</TableCell>
                        <TableCell align='center'>REGISTRATION</TableCell>
                        <TableCell align='center'>May 3, 6:34pm EST</TableCell>
                        <TableCell align='center'>3</TableCell>
                        <TableCell align='center'>!</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='center'>12346</TableCell>
                        <TableCell align='center'>CLOSED</TableCell>
                        <TableCell align='center'>TITANE</TableCell>
                        <TableCell align='center'>MAY 1</TableCell>
                        <TableCell align='center'>Jess#1256</TableCell>
                        <TableCell align='center'>GAME DISPUTE</TableCell>
                        <TableCell align='center'>May 3, 6:34pm EST</TableCell>
                        <TableCell align='center'>0</TableCell>
                        <TableCell align='center'></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{ border: 'none' }}>
                            <Button variant='contained' sx={{ borderRadius: 0, color: 'white', bgcolor: 'black' }}>
                                PAST TICKETS
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
