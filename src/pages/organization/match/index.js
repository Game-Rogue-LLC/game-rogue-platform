import * as React from 'react';
import Button from '@mui/material/Button';
import {
	Box,
	FormControl,
	InputLabel,
	FormHelperText,
	Grid,
	Paper,
	useTheme,
	Typography,
	TextField,
	Alert,
	OutlinedInput
} from '@mui/material';

import AdminLayout from '@/content/AdminLayout';
import { AppContext } from '@/context/app';

const Page = (props) => {
	const theme = useTheme();
    const { setTitle } = React.useContext(AppContext);

    React.useEffect(() => {
        setTitle('MATCHES');
    })

	return (
		<Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
			<Grid container rowSpacing={3}>
				<Grid item xs={12}>
					<Typography variant='h6'>
						Matches
					</Typography>
				</Grid>
                <Alert variant='filled' severity='error' sx={{ mt: 2, width: '100%' }}>
                    '1253234235'
                </Alert>
			</Grid>
		</Paper>
	)
}

Page.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default Page;
