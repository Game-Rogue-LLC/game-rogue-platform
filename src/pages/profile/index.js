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

import { LoadingButton } from '@mui/lab';
import AdminLayout from '@/content/AdminLayout';
import { useAppContext } from '@/context/app';
import { useRouter } from 'next/router';
import { CreditCard, Instagram, Twitter, YouTube } from '@mui/icons-material';
import ContentBlock from '@/pages/profile/components/ContentBlock';

const Page = (props) => {
	const router = useRouter();
	const theme = useTheme();
	const {
		organizations,
		updateOrganization,
		deleteOrganization,
		setTitle,
		current,
		setCurrent,
		uploadContentImage,
		setCurrentOrganization
	} = useAppContext();
	const [disabled, setDisabled] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [orgId, setOrgId] = React.useState(null);
	const [contentImage, setContentImage] = React.useState(null);
	const [saving, setSaving] = React.useState({
		disband: false,
		name: false,
		social: false,
		contentBlock: false,
		features: false
	})
	const [inputs, setInputs] = React.useState({
		name: '',
		tagline: '',
		contentBlock: {
			image: '/Game_Rogue_Text_2_copy.png',
			url: 'https://gamerogue.com',
			title: 'Game Rogue',
			text: 'This is the organization of the game rogue.'
		},
		twitterLink: '',
		instagramLink: '',
		youtubeLink: '',
		discordLink: '',
		twitchLink: '',
		signup: true,
		discord: true,
		twitter: true,
		instagram: true,
		youtube: true,
		twitch: true,
		actualFund: 0,
		crowdFund: 0,
		credit: true,
		paypal: true
	})

	const handle = {
		saveName: (e) => {
			setSaving(prev => ({
				...prev,
				name: true
			}))
			updateOrganization(orgId, {
				name: inputs?.name,
				tagline: inputs?.tagline
			}).then(res => {
				if (res.code == 'success')
					alert(res.message)
				setSaving(prev => ({
					...prev,
					name: false
				}))
			}).catch(err => {
				setSaving(prev => ({
					...prev,
					name: false
				}))
			})
		},
		saveLink: (e) => {
			setSaving(prev => ({
				...prev,
				social: true
			}))
			updateOrganization(orgId, {
				twitterLink: inputs?.twitterLink,
				instagramLink: inputs?.instagramLink,
				youtubeLink: inputs?.youtubeLink,
				twitchLink: inputs?.twitchLink,
				discordLink: inputs?.discordLink
			}).then(res => {
				if (res.code == 'success')
					alert(res.message)
				setSaving(prev => ({
					...prev,
					social: false
				}))
			}).catch(err => {
				setSaving(prev => ({
					...prev,
					social: false
				}))
			})
		},
		saveContentBlock: (e) => {
			setSaving(prev => ({
				...prev,
				contentBlock: true
			}))
			if (contentImage) {
				uploadContentImage(contentImage, current?.organization, (url) => {
					updateOrganization(orgId, {
						contentBlock: {
							...inputs?.contentBlock,
							image: url
						}
					}).then(res => {
						if (res.code == 'success')
							alert(res.message)
						setSaving(prev => ({
							...prev,
							contentBlock: false
						}))
					}).catch(err => {
						setSaving(prev => ({
							...prev,
							contentBlock: false
						}))
					})
				})
			} else {
				updateOrganization(orgId, {
					contentBlock: {
						...inputs?.contentBlock
					}
				}).then(res => {
					if (res.code == 'success')
						alert(res.message)
					setSaving(prev => ({
						...prev,
						contentBlock: false
					}))
				}).catch(err => {
					setSaving(prev => ({
						...prev,
						contentBlock: false
					}))
				})
			}
		},
		saveFeatures: (e) => {
			setSaving(prev => ({
				...prev,
				features: true
			}))
			updateOrganization(orgId, {
				twitter: inputs?.twitter,
				instagram: inputs?.instagram,
				youtube: inputs?.youtube,
				twitch: inputs?.twitch,
				discord: inputs?.discord,
				crowdFund: inputs?.crowdFund,
				actualFund: inputs?.actualFund,
				credit: inputs?.credit,
				paypal: inputs?.paypal
			}).then(res => {
				if (res.code == 'success')
					alert(res.message)
				setSaving(prev => ({
					...prev,
					features: false
				}))
			}).catch(err => {
				setSaving(prev => ({
					...prev,
					features: false
				}))
			})
		},
		delete: (e) => {
			setOpen(false);
			setSaving(prev => ({
				...prev,
				disband: true
			}))
			deleteOrganization(orgId);
		},
		// Open/Close the Modal for delete confirm
		modalOpen: (e) => {
			setOpen(true);
		},
		modalClose: (e) => {
			setOpen(false);
		},
		input: (e) => {
			const { name, value } = e.target;
			setInputs(prev => ({
				...prev,
				[name]: value
			}))
		},
		switch: (e) => {
			const { name, checked } = e.target
			setInputs(prev => ({
				...prev,
				[name]: checked
			}))
		},
		changeContentBlock: (data) => {
			setInputs(prev => ({
				...prev,
				contentBlock: {
					...inputs?.contentBlock,
					...data,
				}
			}))
		},
		uploadContentImageAction: (e, name) => {
			const img = e.target?.files[0];
			if (img.size > 2048000) return;
			setContentImage(img);
			const path = URL.createObjectURL(img);
			setInputs(prev => ({
				...prev,
				contentBlock: {
					...prev.contentBlock,
					image: path
				}
			}))
		}
	}

	React.useEffect(() => {
		setOrgId(router.query?.organization);
	}, [router])

	React.useEffect(() => {
		setCurrentOrganization(orgId);
		setInputs(prev => ({
			...prev,
			...organizations[orgId]
		}))
	}, [organizations, orgId])

	React.useEffect(() => {
		setTitle('ORGANIZER PROFILE');
	}, [])

	return (
		<Box>
			<Paper sx={{ p: 4 }}>
				<Typography variant='h6'>Disband/Delete Profile</Typography>
				<LoadingButton loading={saving?.disband} variant='contained' sx={{ mt: 2 }} onClick={handle.modalOpen}>Disband</LoadingButton>
				<Dialog
					open={open}
					onClose={handle.modalClose}
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
						<Button onClick={handle.modalClose}>Cancel</Button>
						<Button onClick={handle.delete} autoFocus>
							OK
						</Button>
					</DialogActions>
				</Dialog>
			</Paper>

			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant='h6'>Organization Detail</Typography>
				<InputLabel htmlFor="org-name" sx={{ mt: 2 }}>Organization Name</InputLabel>
				<FormHelperText>Controls the publically visible name of this organization.</FormHelperText>
				<FormControl fullWidth error={false}>
					<OutlinedInput id="org-name" name="name" aria-describedby="org-name-helper" value={inputs?.name || ''} onChange={handle.input} disabled={disabled}
						sx={{ mt: 1 }} fullWidth required />
				</FormControl>

				<InputLabel htmlFor="org-tag" sx={{ mt: 2 }}>Tagline</InputLabel>
				<FormControl fullWidth sx={{ mt: 1 }}>
					<OutlinedInput id="org-tag" name="tagline" aria-describedby="org-tag-helper" value={inputs?.tagline || ''} inputProps={{ maxLength: 50 }} required
						onChange={handle.input} disabled={disabled} fullWidth />
				</FormControl>
				<LoadingButton
					loading={saving?.name}
					variant="contained"
					sx={{ mt: 2 }}
					onClick={handle.saveName}
				>
					Save
				</LoadingButton>
			</Paper>

			<ContentBlock contentBlock={inputs.contentBlock} handleChange={handle.changeContentBlock} save={handle.saveContentBlock}
				handleUpload={handle.uploadContentImageAction} saving={saving?.contentBlock} />

			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant='h6'>Social Accounts</Typography>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-twitter">Twitter</InputLabel>
					<FormControl fullWidth>
						<OutlinedInput id="org-twitter" name="twitterLink" aria-describedby="org-twitter-helper" value={inputs?.twitterLink || ''} onChange={handle.input}
							disabled={disabled} sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<Twitter fontSize='large' />
								</InputAdornment>
							} />
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-instagram">Instagram</InputLabel>
					<FormControl fullWidth>
						<OutlinedInput id="org-instagram" name="instagramLink" aria-describedby="org-instagram-helper" value={inputs?.instagramLink || ''} onChange={handle.input}
							disabled={disabled} sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<Instagram fontSize='large' />
								</InputAdornment>
							} />
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-youtube">YouTube</InputLabel>
					<FormControl fullWidth>
						<OutlinedInput id="org-youtube" name="youtubeLink" aria-describedby="org-youtube-helper" value={inputs?.youtubeLink || ''} onChange={handle.input}
							disabled={disabled} sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<YouTube fontSize='large' />
								</InputAdornment>
							} />
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-discord">Discord</InputLabel>
					<FormControl fullWidth>
						<OutlinedInput id="org-discord" name="discordLink" aria-describedby="org-discord-helper" value={inputs?.discordLink || ''} onChange={handle.input}
							disabled={disabled} sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<img src='/static/images/discord.svg' height={'30px'} />
								</InputAdornment>
							} />
					</FormControl>
				</Box>
				<Box sx={{ mt: 2 }}>
					<InputLabel htmlFor="org-twitch">Twitch</InputLabel>
					<FormControl fullWidth>
						<OutlinedInput id="org-twitch" name="twitchLink" aria-describedby="org-twitch-helper" value={inputs?.twitchLink || ''} onChange={handle.input}
							disabled={disabled} sx={{ mt: 1 }} fullWidth startAdornment={
								<InputAdornment position='start'>
									<SvgIcon fontSize='large'>
										<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
											<path fill="currentColor" d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z" />
										</svg>
									</SvgIcon>
								</InputAdornment>
							} />
					</FormControl>
				</Box>
				<LoadingButton
					loading={saving?.social}
					variant="contained"
					sx={{ mt: 2 }}
					onClick={handle.saveLink}
				>
					Save
				</LoadingButton>
			</Paper>

			<Paper sx={{ p: 4, mt: 4 }}>
				<Typography variant='h6'>Turn on/off features</Typography>
				<FormGroup sx={{ mt: 2 }}>
					<FormControlLabel control={<Switch checked={inputs?.signup} name='signup' onChange={handle.switch} />} label="Sign-up" />
					<FormControlLabel control={<Switch checked={inputs?.discord} name='discord' onChange={handle.switch} />} label="Discord community preview" />
					<FormControlLabel control={<Switch checked={inputs?.twitter} name='twitter' onChange={handle.switch} />} label="Show recent Twitter activity" />
					<FormControlLabel control={<Switch checked={inputs?.instagram} name='instagram' onChange={handle.switch} />} label="Show recent Instagram activity" />
					<FormControlLabel control={<Switch checked={inputs?.youtube} name='youtube' onChange={handle.switch} />} label="Show recent YouTube videos" />
					<FormControlLabel control={<Switch checked={inputs?.twitch} name='twitch' onChange={handle.switch} />} label="Twitch streams" />
				</FormGroup>
				<Grid container spacing={2} sx={{ alignItems: 'center' }}>
					<Grid item>
						<FormControlLabel control={<Switch defaultChecked />} label="Crowdfund" />
					</Grid>
					<Grid item>
						<OutlinedInput size='small' name='actualFund' value={Number(inputs?.actualFund).toFixed(2)} disabled />
					</Grid>
					<Grid item>
						<span style={{ fontSize: '30px' }}>/</span>
					</Grid>
					<Grid item>
						<OutlinedInput size='small' name='crowdFund' value={inputs?.crowdFund} onChange={handle.input} />
					</Grid>
				</Grid>
				<Box display='flex' sx={{ pl: 5 }}>
					<Box>
						<Box display='flex' alignItems='center'>
							<Checkbox name='credit' checked={inputs?.credit} onChange={handle.switch} />
							<CreditCard />
							<Typography variant='body2' sx={{ ml: 2 }}>Credit/Debit Card</Typography>
						</Box>
						<Box>
						</Box>
					</Box>
					<Box>
						<Box display='flex' alignItems='center'>
							<Checkbox name='paypal' checked={inputs?.paypal} onChange={handle.switch} />
							<img src='/static/images/paypal-color.svg' style={{ height: '30px' }} />
						</Box>
					</Box>
				</Box>
				<LoadingButton
					loading={saving?.features}
					variant="contained"
					sx={{ mt: 2 }}
					onClick={handle.saveFeatures}
				>
					Save
				</LoadingButton>
			</Paper>
		</Box>
	)
}

Page.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default Page;
