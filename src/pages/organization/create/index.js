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
import { useAppContext } from '@/context/app';
import { useRouter } from 'next/router';
import { useOrganizationContext } from '@/src/context/OrganizationContext';

const Page = (props) => {
	const theme = useTheme()
	const router = useRouter()
	const { setTitle } = useAppContext()
	const { addOrganization, activeCount } = useOrganizationContext()
	const [inputs, setInputs] = React.useState({ name: '', tagline: '' })
	const [valid, setValid] = React.useState({ name: true, tagline: true })
	const [disabled, setDisabled] = React.useState(false)

	const validate = ({ name, value }) => {
		if (value) {
			setValid(prevState => ({ ...prevState, [name]: true }));
			return true;
		} else {
			setValid(prevState => ({ ...prevState, [name]: false }));
			return false;
		}
	}

	const handleCreate = async (e) => {
		if (!validate({ name: 'name', value: inputs?.name }) | !validate({ name: 'tagline', value: inputs?.tagline })) {
			return;
		}
		setValid({ name: true, tagline: true });
		const newOrg = {
			...inputs
		}
		setInputs({
			name: '',
			tagline: ''
		})
		addOrganization(newOrg)
			.then(res => {
				if (res.code === 'succeed') {
					router.push('/profile?organization=' + res.id)
				} else if (res.code === 'failed') {
					console.log(res.message)
				}
			})
			.catch(err => {
				console.log(err)
			})
	}

	const handleInputs = (e) => {
		const { name, value } = e.target;
		validate({ name, value });
		setInputs({
			...inputs,
			[name]: value
		})
	}

	React.useEffect(() => {
		if (activeCount >= 3)
			setDisabled(true)
		else setDisabled(false)
	}, [activeCount])

	React.useEffect(() => {
		setTitle('REGISTER AN ORGANIZATION');
	}, [])

	return (
		<Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
			<Grid container rowSpacing={3}>
				<Grid item xs={12}>
					<Typography variant='h6'>
						Register Organization
					</Typography>
				</Grid>
				<Grid item xs={12}>
					<InputLabel htmlFor="org-name">Organization Name</InputLabel>
					<FormHelperText sx={{ mt: 2 }}>Controls the publically visible name of this organization.</FormHelperText>
					<FormControl fullWidth error={!valid?.name}>
						<OutlinedInput id="org-name" name="name" aria-describedby="org-name-helper" value={inputs.name} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth required />
						{!valid?.name && <FormHelperText id="org-name-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<InputLabel htmlFor="org-tag">Tagline</InputLabel>
					<FormControl fullWidth sx={{ mt: 1 }} error={!valid?.tagline}>
						<OutlinedInput id="org-tag" name="tagline" aria-describedby="org-tag-helper" value={inputs.tagline} inputProps={{ maxLength: 50 }}
							onChange={handleInputs} disabled={disabled} fullWidth required />
						{!valid?.tagline && <FormHelperText id="org-tag-helper" sx={{ mt: 2 }}>Tagline is required.</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item>
					<Button
						variant='contained'
						onClick={handleCreate}
						disabled={disabled}
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
