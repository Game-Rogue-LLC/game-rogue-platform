import { useEffect, useState } from 'react';
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
    OutlinedInput,
    IconButton,
    Select,
    MenuItem
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Edit } from '@mui/icons-material';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useRouter } from 'next/router';
import { useOrganizationContext } from '@/src/context/OrganizationContext';
import { useTournamentContext } from '@/src/context/TournamentContext';
import CountrySelect from '@/src/pages/components/CountrySelect';
import GameSelect from '@/src/pages/components/GameSelect';
import { useUser } from '@/lib/firebase/useUser';
import { DEFAULT_LOGO } from '@/src/config/global';

const initialInputs = {
    name: '',
    short: '',
    accessCode: '',
    residency: '',
    game: '',
    type: 0,
    darkLogo: DEFAULT_LOGO,
    lightLogo: DEFAULT_LOGO,
    description: ''
}

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { user } = useUser();
    const { setTitle } = useAppContext();
    const [inputs, setInputs] = useState({ ...initialInputs });
    const { team } = useTournamentContext();
    const [tid, setTID] = useState(null);
    const [darkLogo, setDarkLogo] = useState(null);
    const [lightLogo, setLightLogo] = useState(null);
    const [saving, setSaving] = useState(false);

    const handle = {
        save: async (e) => {
            setSaving(true);
            let newTeam = {
                ...inputs
            }
            let uploaded = true;
            if (darkLogo) {
                uploaded = false
                const res = await team.upload(darkLogo, tid, 'logo_dark');
                if (res.code === 'succeed') {
                    newTeam.darkLogo = res.url;
                    uploaded = true;
                }
            }
            if (lightLogo) {
                uploaded = false
                const res = await team.upload(lightLogo, tid, 'logo_light');
                if (res.code === 'succeed') {
                    newTeam.lightLogo = res.url;
                    uploaded = true;
                }
            }
            if (uploaded == true) {
                const res = await team.update(tid, newTeam);
                if (res.code === 'succeed') {
                    alert('Saved Successfully!')
                }
            }
            setSaving(false);
        },
        inputs: (e) => {
            const { name, value } = e.target;
            setInputs(prev => ({
                ...prev,
                [name]: value
            }))
        },
        changeDarkLogo: (e) => {
            const file = e.target.files[0];
            setDarkLogo(file);
            const url = URL.createObjectURL(file);
            setInputs(prev => ({
                ...prev,
                darkLogo: url
            }))
        },
        changeLightLogo: (e) => {
            const file = e.target.files[0];
            setLightLogo(file);
            const url = URL.createObjectURL(file);
            setInputs(prev => ({
                ...prev,
                lightLogo: url
            }))
        },
        removeDarkLogo: (e) => {
            setInputs(prev => ({
                ...prev,
                darkLogo: DEFAULT_LOGO
            }))
        },
        removeLightLogo: (e) => {
            setInputs(prev => ({
                ...prev,
                lightLogo: DEFAULT_LOGO
            }))
        }
    }

    useEffect(() => {
        console.log(inputs)
    }, [inputs])

    useEffect(() => {
        setInputs(prev => ({
            ...prev,
            ...team.teams[tid]
        }))
    }, [tid])

    useEffect(() => {
        setTID(router.query?.tid);
    }, [router])

    useEffect(() => {
        setTitle('EDIT TEAM');
    }, [])

    return (
        <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
            <Grid container rowSpacing={3} spacing={2}>
                <Grid item xs={12}>
                    <Box border={'solid 1px gray'} p={4} borderRadius={1}>
                        <Typography variant='h5'>
                            Logo
                        </Typography>
                        <Typography variant='body1'>
                            We need you to upload a dark and a light logo to ensure that the logo is visible on every background. The logo must have sufficient contrast both on white and on black background. Besides that the logo must touch at least two of four cyan guidelines.
                        </Typography>
                        <Box display={'flex'} justifyContent={'center'} gap={4} alignItems={'center'} mt={2}>
                            <Box display={'flex'} justifyContent={'center'} gap={2}>
                                <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={'baseline'}>
                                    <Button variant='contained' color='primary' component='label'>
                                        UPLOAD DARK LOGO
                                        <input type="file" accept="image/*" name="upload-dark-logo" id="upload-dark-logo" hidden onChange={handle.changeDarkLogo} />
                                    </Button>
                                    <Button variant='contained' color='primary' component='label' onClick={handle.removeDarkLogo}>
                                        REMOVE DARK LOGO
                                    </Button>
                                </Box>
                                <Box width={'200px'} height={'200px'} textAlign={'center'}>
                                    <img src={inputs.darkLogo || DEFAULT_LOGO} style={{ height: '200px', maxWidth: '200px', objectFit: 'contain' }} />
                                </Box>
                            </Box>
                            <Box display={'flex'} justifyContent={'center'} gap={2}>
                                <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={'baseline'}>
                                    <Button variant='contained' color='primary' component='label'>
                                        UPLOAD LIGHT LOGO
                                        <input type="file" accept="image/*" name="upload-light-logo" id="upload-light-logo" hidden onChange={handle.changeLightLogo} />
                                    </Button>
                                    <Button variant='contained' color='primary' component='label' onClick={handle.removeLightLogo}>
                                        REMOVE LIGHT LOGO
                                    </Button>
                                </Box>
                                <Box width={'200px'} height={'200px'} textAlign={'center'}>
                                    <img src={inputs.lightLogo || DEFAULT_LOGO} style={{ height: '200px', maxWidth: '200px', objectFit: 'contain' }} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-name">Team Name</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput id="team-name" name="name" value={inputs.name} onChange={handle.inputs}
                            sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-short-name">Short Name</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput id="team-short-name" name="short" value={inputs.short}
                            onChange={handle.inputs} sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-access-code">Access Code</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput id="team-access-code" name="accessCode" value={inputs.accessCode}
                            onChange={handle.inputs} sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-residency">Residency</InputLabel>
                    <CountrySelect sx={{ mt: 1, width: '100%' }} option={inputs.residency}
                        setOption={(val) => setInputs(prev => ({ ...prev, residency: val }))} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-game">Game</InputLabel>
                    <GameSelect sx={{ mt: 1, width: '100%' }} option={inputs.game}
                        setOption={(val) => setInputs(prev => ({ ...prev, game: val }))} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-game">Team Type</InputLabel>
                    <Select
                        labelId="type-select-label"
                        id="type-select"
                        variant='outlined'
                        sx={{ mt: 1 }}
                        value={inputs.type}
                        name='type'
                        onChange={handle.inputs}
                        fullWidth
                    >
                        <MenuItem value={0}>Casual</MenuItem>
                        <MenuItem value={1}>Major</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <InputLabel htmlFor="team-description">Description</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput multiline id="team-description" name="description" value={inputs.description}
                            onChange={handle.inputs} sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item>
                    <LoadingButton
                        loading={saving}
                        variant='contained'
                        onClick={handle.save}
                    >
                        Save
                    </LoadingButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;
