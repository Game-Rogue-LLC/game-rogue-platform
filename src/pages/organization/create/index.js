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

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useRouter } from 'next/router';
import { useOrganizationContext } from '@/src/context/OrganizationContext';
import Validator from 'validatorjs';

const initialInputs = {
	name: '',
	tagline: ''
}

const rules = {
	name: 'required',
	tagline: 'required'
}

const Page = (props) => {
	const theme = useTheme()
	const router = useRouter()
	const { setTitle } = useAppContext()
	const { addOrganization, activeCount } = useOrganizationContext()
	const [inputs, setInputs] = React.useState({ name: '', tagline: '' })
	const [valid, setValid] = React.useState({ name: true, tagline: true })
	const [disabled, setDisabled] = React.useState(false)

	const validate = (data, rule) => {
		let validator = new Validator(data, rule);
		if (validator.fails()) {
			setErrors(validator.errors.errors);
			return false;
		}
		setErrors({});
		return true;
	}

	const handleCreate = async (e) => {
		if (!validate(inputs, rules)) return;
		const newOrg = {
			...inputs
		}
		setInputs({ ...initialInputs })
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
					<FormControl fullWidth error={errors.name !== undefined}>
						<OutlinedInput id="org-name" name="name" aria-describedby="org-name-helper" value={inputs.name} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth required />
						{errors.name !== undefined && <FormHelperText id="org-name-helper" sx={{ mt: 2 }}>{errors.name}</FormHelperText>}
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<InputLabel htmlFor="org-tag">Tagline</InputLabel>
					<FormControl fullWidth sx={{ mt: 1 }} error={errors.tagline !== undefined}>
						<OutlinedInput id="org-tag" name="tagline" aria-describedby="org-tag-helper" value={inputs.tagline} inputProps={{ maxLength: 50 }}
							onChange={handleInputs} disabled={disabled} fullWidth required />
						{errors.tagline !== undefined && <FormHelperText id="org-tag-helper" sx={{ mt: 2 }}>{errors.tagline}</FormHelperText>}
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
