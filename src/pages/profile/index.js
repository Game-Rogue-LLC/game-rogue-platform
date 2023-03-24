import * as React from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	FormControl,
	InputLabel,
	FormHelperText,
	Grid,
	Paper,
	useTheme,
	Typography,
	TextField,
	Alert,
	OutlinedInput,
	InputAdornment,
	SvgIcon,
	FormGroup,
	FormControlLabel,
	Switch,
	Checkbox
} from '@mui/material';

import AdminLayout from '@/content/AdminLayout';
import { AppContext } from '@/context/app';
import { useRouter } from 'next/router';
import { CreditCard, Instagram, Twitter, YouTube } from '@mui/icons-material';
import ContentBlock from '@/pages/profile/components/content-block';

const Page = (props) => {
	const router = useRouter();
	const theme = useTheme();
	const { organizations, addOrganization, updateOrganization, deleteOrganization, setTitle, currentOrganization } = React.useContext(AppContext);
	const [inputs, setInputs] = React.useState({
		name: currentOrganization?.name,
		tagline: currentOrganization?.tagline,
		credit: currentOrganization?.credit,
		paypal: currentOrganization?.paypal,
		twitter: currentOrganization?.twitter,
		instagram: currentOrganization?.instagram,
		youtube: currentOrganization?.youtube,
		twitch: currentOrganization?.twitch
	})
	const [valid, setValid] = React.useState({
		name: true,
		tagline: true
	});
	const [disabled, setDisabled] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const orgId = router.query?.organization;

	const validate = ({ name, value }) => {
		if (value) {
			setValid(prevState => ({ ...prevState, [name]: true }));
			return true;
		} else {
			setValid(prevState => ({ ...prevState, [name]: false }));
			return false;
		}
	}

	const handleSaveName = (e) => {
		if (!validate({ name: 'name', value: inputs?.name }) | !validate({ tagline: 'tagline', value: inputs?.tagline })) {
			return;
		}
		setValid({ name: true, tagline: true });
		updateOrganization(orgId, {
			name: inputs?.name,
			tagline: inputs?.tagline
		})
	}

	const handleSaveLink = (e) => {
		updateOrganization(orgId, {
			twitter: inputs?.twitter,
			instagram: inputs?.instagram,
			youtube: inputs?.youtube,
			twitch: inputs?.twitch
		})
	}

	const handleDelete = (e) => {
		deleteOrganization(orgId);
		setOpen(false)
	}

	const handleOpen = (e) => {
		setOpen(true);
	}

	const handleClose = (e) => {
		setOpen(false);
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
	}, [organizations])

	React.useEffect(() => {
		setTitle('ORGANIZER PROFILE');
	})

	return (
		<Box>
			<Paper sx={{ p: 4 }}>
				<Typography variant='h6'>Disband/Delete Profile</Typography>
				<Button variant='contained' sx={{ borderRadius: 0, mt: 2 }} onClick={handleOpen}>Disband</Button>
				<Dialog
					open={open}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{"Delete the organizer profile?"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Do you really want to delete this profile?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleDelete} autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</Paper>

			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant='h6'>Organization Detail</Typography>
				<InputLabel htmlFor="org-name" sx={{ mt: 2 }}>Organization Name</InputLabel>
				<FormHelperText>Controls the publically visible name of this organization.</FormHelperText>
				<FormControl fullWidth error={!valid?.name}>
					<OutlinedInput id="org-name" name="name" aria-describedby="org-name-helper" value={inputs.name} onChange={handleInputs} disabled={disabled}
						sx={{ mt: 1 }} fullWidth />
					{!valid?.name && <FormHelperText id="org-name-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
				</FormControl>
				
				<InputLabel htmlFor="org-tag" sx={{ mt: 2 }}>Tagline</InputLabel>
				<FormControl fullWidth sx={{ mt: 1 }} error={!valid?.tagline}>
					<OutlinedInput id="org-tag" name="tagline" aria-describedby="org-tag-helper" value={inputs.tagline} inputProps={{ maxLength: 50 }} required
						onChange={handleInputs} disabled={disabled} fullWidth />
					{!valid?.tagline && <FormHelperText id="org-tag-helper" sx={{ mt: 2 }}>Tagline is required.</FormHelperText>}
				</FormControl>
				<Button sx={{ mt: 2 }} variant='contained' onClick={handleSaveName}>
					Save
				</Button>
			</Paper>

			<ContentBlock />

			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant='h6'>Social Accounts</Typography>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-twitter">Twitter</InputLabel>
					<FormControl fullWidth error={!valid?.name}>
						<OutlinedInput id="org-twitter" name="twitter" aria-describedby="org-twitter-helper" value={inputs.twitter} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<Twitter fontSize='large' />
								</InputAdornment>
							} />
						{!valid?.name && <FormHelperText id="org-twitter-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-instagram">Instagram</InputLabel>
					<FormControl fullWidth error={!valid?.name}>
						<OutlinedInput id="org-instagram" name="instagram" aria-describedby="org-instagram-helper" value={inputs.instagram} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<Instagram fontSize='large' />
								</InputAdornment>
							} />
						{!valid?.name && <FormHelperText id="org-instagram-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-youtube">YouTube</InputLabel>
					<FormControl fullWidth error={!valid?.name}>
						<OutlinedInput id="org-youtube" name="youtube" aria-describedby="org-youtube-helper" value={inputs.youtube} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<YouTube fontSize='large' />
								</InputAdornment>
							} />
						{!valid?.name && <FormHelperText id="org-youtube-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-discord">Discord</InputLabel>
					<FormControl fullWidth error={!valid?.name}>
						<OutlinedInput id="org-discord" name="discord" aria-describedby="org-discord-helper" value={inputs.discord} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<img src='/static/images/discord.svg' height={'30px'} />
								</InputAdornment>
							} />
						{!valid?.name && <FormHelperText id="org-discord-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-twitch">Twitch</InputLabel>
					<FormControl fullWidth error={!valid?.name}>
						<OutlinedInput id="org-twitch" name="twitch" aria-describedby="org-twitch-helper" value={inputs.twitch} onChange={handleInputs} disabled={disabled}
							sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<SvgIcon fontSize='large'>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
											<path fill="currentColor" d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z" />
										</svg>
									</SvgIcon>
								</InputAdornment>
							} />
						{!valid?.name && <FormHelperText id="org-twitch-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
					</FormControl>
				</Box>
				<Button sx={{ mt: 2 }} variant='contained' onClick={handleSaveLink}>
					Save
				</Button>
			</Paper>

			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant='h6'>Turn on/off features</Typography>
				<FormGroup sx={{ mt: 2 }}>
					<FormControlLabel control={<Switch defaultChecked />} label="Sign-up" />
					<FormControlLabel control={<Switch defaultChecked />} label="Discord community preview" />
					<FormControlLabel control={<Switch defaultChecked />} label="Show recent Twitter activity" />
					<FormControlLabel control={<Switch defaultChecked />} label="Show recent Instagram activity" />
					<FormControlLabel control={<Switch defaultChecked />} label="Show recent YouTube videos" />
					<FormControlLabel control={<Switch defaultChecked />} label="Twitch streams" />
				</FormGroup>
				<Grid container spacing={2} sx={{ alignItems: 'center' }}>
					<Grid item>
						<FormControlLabel control={<Switch defaultChecked />} label="Crowdfund" />
					</Grid>
					<Grid item>
						<OutlinedInput size='small' value={'2598.00'} />
					</Grid>
					<Grid item>
						<span style={{ fontSize: '30px' }}>/</span>
					</Grid>
					<Grid item>
						<OutlinedInput size='small' value={'3000.00'} disabled />
					</Grid>
				</Grid>
				<Box display='flex' sx={{ pl: 5 }}>
					<Box>
						<Box display='flex' alignItems='center'>
							<Checkbox defaultChecked />
							<CreditCard />
							<Typography variant='body2' sx={{ ml: 2 }}>Credit/Debit Card</Typography>
						</Box>
						<Box>
						</Box>
					</Box>
					<Box>
						<Box display='flex' alignItems='center'>
							<Checkbox defaultChecked />
							<img src='/static/images/paypal-color.svg' style={{ height: '30px' }} />
						</Box>
					</Box>
				</Box>
			</Paper>
		</Box>
	)
}

Page.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default Page;
