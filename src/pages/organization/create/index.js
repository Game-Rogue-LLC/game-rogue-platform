import * as React from 'react';
import Button from '@mui/material/Button';
import {
	Box,
	FormControl,
	InputLabel,
	Input,
	FormHelperText,
	Grid,
	Paper,
	useTheme,
	Typography
} from '@mui/material';

import AdminLayout from '@/content/AdminLayout';
import { AppContext } from '@/context/app';

const Page = (props) => {
	const theme = useTheme();
	const { addOrganization } = React.useContext(AppContext);
	const [inputs, setInputs] = React.useState({
		name: '',
		description: ''
	})

	const handleCreate = (e) => {
		addOrganization({
			_id: new Date().getTime(),
			...inputs
		})
	}

	const handleInputs = (e) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[name]: value
		})
	}

	return (
		<Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Typography variant='h6'>
						Register Organization
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel htmlFor="org-name">Organization Name</InputLabel>
						<Input id="org-name" name="name" aria-describedby="org-name-helper" value={inputs.name}
							onChange={handleInputs} />
						<FormHelperText id="org-name-helper"></FormHelperText>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel htmlFor="org-desc">Description</InputLabel>
						<Input id="org-desc" name="description" aria-describedby="org-desc-helper" value={inputs.description}
							onChange={handleInputs} />
						<FormHelperText id="org-desc-helper"></FormHelperText>
					</FormControl>
				</Grid>
				<Grid item>
					<Button
						variant='contained'
						onClick={handleCreate}
					>
						Register
					</Button>
				</Grid>
			</Grid>
		</Paper>
	)
}

Page.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default Page;
