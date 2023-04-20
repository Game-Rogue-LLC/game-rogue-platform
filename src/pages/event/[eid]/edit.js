import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    MenuItem,
    OutlinedInput,
    TextField,
    Paper,
    Select,
    Typography,
    useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import Validator from 'validatorjs';

import { Edit } from '@mui/icons-material';
import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import DateTimePicker from '@/src/pages/components/DateTimePicker';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { DEFAULT_LOGO, DEFAULT_CONTENTBLOCK_IMAGE } from '@/src/config/global';

const initialInputs = {
    name: '',
    banner: DEFAULT_CONTENTBLOCK_IMAGE,
    darkLogo: DEFAULT_LOGO,
    lightLogo: DEFAULT_LOGO,
    oid: '',
    format: 0,
    tournament: 0,
    league: 0,
    seed: 0,
    startAt: new Date(),
    registerTo: new Date(),
    game: 0,
    platform: 0,
    region: 0,
    timezone: 0,
    rulebook: '',
    terms: '',
    privacy: '',
    checkin: 15,
    description: '',
    participantsCount: 2,
    deleted: false
}

const rules = {
    name: 'required',
    checkin: 'required',
    participantsCount: 'required'
}

const customMessages = {
    'required.name': 'Event Name is required.',
    'required.checkin': 'CheckIn is required.',
    'required.participantsCount': 'Participant Count is required.'
}

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const [eid, setEID] = useState(null);
    const { setTitle } = useAppContext();
    const { organization, event } = useTournamentContext();
    const [saving, setSaving] = useState(false);
    const [rulebook, setRulebook] = useState(null);
    const [terms, setTerms] = useState(null);
    const [privacy, setPrivacy] = useState(null);
    const [banner, setBanner] = useState(null);
    const [inputs, setInputs] = useState({ ...initialInputs })
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState(false);
    const [darkLogo, setDarkLogo] = useState(null);
    const [lightLogo, setLightLogo] = useState(null);

    useEffect(() => {
        setTitle('EDIT EVENT');
    }, [])

    useEffect(() => {
        if (router?.query.eid) {
            setEID(router.query.eid);
        }
    }, [router])

    useEffect(() => {
        if (eid) {
            event.setCurrent(eid);
            organization.setCurrent(event.events[eid]?.oid);
            setInputs({
                ...event.events[eid]
            })
        }
    }, [eid, event.events])

    const validate = (data, rule, messages) => {

        if (data.participantsCount % 2) {
            setErrors(prev => ({
                ...prev,
                participantsCount: 'Participant Count must be even number.'
            }))
        }

        let validator = new Validator(data, rule, messages);
        if (validator.fails()) {
            setErrors(prev => ({
                ...prev,
                ...validator.errors.errors
            }));
            return false;
        }

        if (data.participantsCount % 2) return false;
        setErrors({});
        return true;
    }

    const setDate = (name, newDate) => {
        setInputs(prev => ({
            ...prev,
            [name]: new Date(newDate)
        }))
    }

    const handle = {
        save: async (e) => {
            if (validate(inputs, rules, customMessages) === false) {
                return;
            }
            let newEvent = { ...inputs };
            let uploaded = true;
            setSaving(true)

            if (banner) {
                uploaded = false;
                const res = await event.upload(banner, eid, 'banner');
                if (res.code === 'succeed') {
                    newEvent.banner = res.url;
                    uploaded = true;
                }
            }
            if (darkLogo) {
                uploaded = false;
                const res = await event.upload(darkLogo, eid, 'darkLogo');
                if (res.code === 'succeed') {
                    newEvent.darkLogo = res.url;
                    uploaded = true;
                }
            }
            if (lightLogo) {
                uploaded = false;
                const res = await event.upload(lightLogo, eid, 'lightLogo');
                if (res.code === 'succeed') {
                    newEvent.lightLogo = res.url;
                    uploaded = true;
                }
            }
            if (rulebook) {
                uploaded = false;
                const res = await event.upload(rulebook, eid, 'rulebook');
                if (res.code === 'succeed') {
                    newEvent.rulebook = res.url;
                    uploaded = true;
                }
            }
            if (terms) {
                uploaded = false;
                const res = await event.upload(terms, eid, 'terms');
                if (res.code === 'succeed') {
                    newEvent.terms = res.url;
                    uploaded = true;
                }
            }
            if (privacy) {
                uploaded = false;
                const res = await event.upload(privacy, eid, 'privacy');
                if (res.code === 'succeed') {
                    newEvent.privacy = res.url;
                    uploaded = true;
                }
            }

            const res = await event.update(eid, newEvent);
            if (res.code === 'succeed') {
                alert('Saved successfully!');
            }
            setSaving(false);
        },
        inputs: (e) => {
            const { name, value } = e.target
            setInputs({
                ...inputs,
                [name]: value
            })
        },
        upload: (e, name) => {
            const file = e.target?.files[0];
            const url = URL.createObjectURL(file);
            switch (name) {
                case 'banner':
                    console.log(1)
                    setBanner(file);
                    setInputs({
                        ...inputs,
                        banner: url
                    })
                    break;
                case 'darkLogo':
                    console.log(2)
                    setDarkLogo(file);
                    setInputs({
                        ...inputs,
                        darkLogo: url
                    })
                    break;
                case 'lightLogo':
                    console.log(3)
                    setLightLogo(file);
                    setInputs({
                        ...inputs,
                        lightLogo: url
                    })
                    break;
                case 'rulebook':
                    setRulebook(file);
                    break;
                case 'terms':
                    setTerms(file);
                    break;
                case 'privacy':
                    setPrivacy(file);
                    break;
            }
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

    return (
        <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
            <Grid container spacing={2} rowSpacing={4}>
                <Grid item xs={12}>

                    <Box display={'flex'} justifyContent={'center'} gap={4} alignItems={'center'} mt={2}>
                        <Box display={'flex'} justifyContent={'center'} gap={2}>
                            <Box display={'flex'} flexDirection={'column'} gap={2} alignItems={'baseline'}>
                                <Button variant='contained' color='primary' component='label'>
                                    UPLOAD DARK LOGO
                                    <input type="file" accept="image/*" name="upload-dark-logo" id="upload-dark-logo" hidden onChange={(e) => handle.upload(e, 'darkLogo')} />
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
                                    <input type="file" accept="image/*" name="upload-light-logo" id="upload-light-logo" hidden onChange={(e) => handle.upload(e, 'lightLogo')} />
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

                    <Box sx={{ textAlign: 'center', position: 'relative', mt: 3 }}>
                        <IconButton sx={{ position: 'absolute', right: 0, bottom: 0 }} color='primary' component='label'>
                            <Edit />
                            <input type="file" accept="image/*" name="upload-banner" id="upload-banner" hidden onChange={(e) => handle.upload(e, 'banner')} />
                        </IconButton>
                        <img src={inputs?.banner || DEFAULT_CONTENTBLOCK_IMAGE} style={{ height: '200px', maxWidth: '600px', objectFit: 'cover', border: 'solid 1px rgba(255, 255, 255, 0.2)', borderRadius: '4px' }} />
                    </Box>

                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Organization</Typography>
                    <Select
                        labelId="organization-select-label"
                        id="organization-select"
                        value={inputs?.oid}
                        onChange={handle.inputs}
                        variant="outlined"
                        name="oid"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        {Object.keys(organization.organizations).map((key, i) => {
                            const item = organization.organizations[key];
                            return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                        })}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Box>
                        <Typography variant='h6'>Event Name</Typography>
                        <FormControl sx={{ mt: 1 }} fullWidth error={errors.name !== undefined}>
                            <OutlinedInput id="event-name" name="name" aria-describedby="event-name-helper" value={inputs?.name} disabled={disabled}
                                onChange={handle.inputs} />
                            {errors.name !== undefined && <FormHelperText id="event-name-helper" sx={{ mt: 2 }}>{errors.name}</FormHelperText>}
                        </FormControl>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Typography variant='h6'>Event Description</Typography>
                        <FormControl fullWidth sx={{ mt: 1 }}>
                            <TextField multiline id="event-description" name="description" aria-describedby="event-description-helper" value={inputs?.description} disabled={disabled}
                                onChange={handle.inputs} />
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Typography variant='h6'>Event Format</Typography>
                    <Select
                        labelId="format-select-label"
                        id="format-select"
                        value={inputs?.format}
                        name="format"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='tournament' value={0}>Tournament</MenuItem>
                        <MenuItem key='league' value={1}>League</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Typography variant='h6'>Game Type</Typography>
                    <Box sx={{ mt: 1 }}>
                        {
                            inputs?.format == 0
                                ? <Select
                                    labelId="tournament-select-label"
                                    id="tournament-select"
                                    value={inputs?.tournament}
                                    name="tournament"
                                    onChange={handle.inputs}
                                    variant="outlined"
                                    disabled={disabled}
                                    fullWidth
                                >
                                    <MenuItem key='single-elimination' value={0}>Single Elimination</MenuItem>
                                    <MenuItem key='double-elimination' value={1}>Double Elimination</MenuItem>
                                    <MenuItem key='ladder-elimination' value={2}>Ladder Elimination</MenuItem>
                                    <MenuItem key='pyramid-elimination' value={3}>Pyramid Elimination</MenuItem>
                                </Select>
                                : <Select
                                    labelId="league-select"
                                    id="league-select-temp"
                                    value={inputs?.league}
                                    name="league"
                                    onChange={handle.inputs}
                                    variant="outlined"
                                    disabled={disabled}
                                    fullWidth
                                >
                                    <MenuItem key='straight-round-robin' value={0}>Straight Round Robin</MenuItem>
                                    <MenuItem key='round-robin-double-split' value={1}>Round Robin Double Split</MenuItem>
                                    <MenuItem key='round-robin-triple-split' value={2}>Round Robin Triple Split</MenuItem>
                                    <MenuItem key='round-robin-quadruple-split' value={3}>Round Robin Quadruple Split</MenuItem>
                                    <MenuItem key='semi-round-robin' value={4}>Semi Round Robin</MenuItem>
                                </Select>
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Typography variant='h6'>Event Seed</Typography>
                    <Select
                        labelId="seed-select-label"
                        id="seed-select"
                        value={inputs?.seed}
                        name="seed"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='manual' value={0}>Manual</MenuItem>
                        <MenuItem key='random' value={1}>Random</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <Typography variant='h6'>Participants</Typography>
                    <FormControl sx={{ mt: 1 }} fullWidth error={errors.participantsCount !== undefined}>
                        <OutlinedInput id="participants-count" name="participantsCount" aria-describedby="participants-count-helper" value={inputs?.participantsCount} disabled={disabled}
                            type='number' step={2} onChange={handle.inputs} />
                        {errors.participantsCount !== undefined && <FormHelperText id="participants-count-helper" sx={{ mt: 2 }}>{errors.participantsCount}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant='h6'>Start Date</Typography>
                    <DateTimePicker value={inputs?.startAt} setValue={(newDate) => setDate('startAt', newDate)} sx={{ mt: 1, width: '100%' }} disabled={disabled} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant='h6'>Register Date</Typography>
                    <DateTimePicker value={inputs?.registerTo} setValue={(newDate) => setDate('registerTo', newDate)} sx={{ mt: 1, width: '100%' }} disabled={disabled} />
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant='h6'>CheckIn</Typography>
                    <FormControl sx={{ mt: 1 }} fullWidth error={errors.checkin !== undefined}>
                        <OutlinedInput id="check-in" name="checkin" aria-describedby="check-in-helper" value={inputs?.checkin} disabled={disabled}
                            type='number' step={1} onChange={handle.inputs} />
                        {errors.checkin !== undefined && <FormHelperText id="check-in-helper" sx={{ mt: 2 }}>{errors.checkin}</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Game</Typography>
                    <Select
                        labelId="game-select-label"
                        id="game-select"
                        value={inputs?.game}
                        name="game"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='rainbow-six-siege' value={0}>Rainbow Six Siege</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Platform</Typography>
                    <Select
                        labelId="platform-select-label"
                        id="platform-select"
                        value={inputs?.platform}
                        name="platform"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='pc' value={0}>PC</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Region</Typography>
                    <Select
                        labelId="region-select-label"
                        id="region-select"
                        value={inputs?.region}
                        name="region"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='north-american' value={0}>North American</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Time Zone</Typography>
                    <Select
                        labelId="timezone-select-label"
                        id="timezone-select"
                        value={inputs?.timezone}
                        name="timezone"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='ast' value={0}>Atlantic Standard Time (AST)</MenuItem>
                        <MenuItem key='est' value={1}>Eastern Standard Time (EST)</MenuItem>
                        <MenuItem key='cst' value={2}>Central Standard Time (CST)</MenuItem>
                        <MenuItem key='mst' value={3}>Mountain Standard Time (MST)</MenuItem>
                        <MenuItem key='pst' value={4}>Pacific Standard Time (PST)</MenuItem>
                        <MenuItem key='akst' value={5}>Alaskan Standard Time (AKST)</MenuItem>
                    </Select>
                </Grid>
                {/** PLACE SCHEDULE HERE */}
                <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='h6'>Add a Rulebook</Typography>
                        <Typography variant='subtitle2'>Publicly shared (.pdf) and must be accepted by competitors.</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body2' align='center'>{inputs?.rulebook}</Typography>
                        <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth disabled={disabled}>
                            + Upload
                            <input type="file" accept=".pdf" name="upload-rulebook" id="upload-rulebook" hidden onChange={(e) => handle.upload(e, 'rulebook')} />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='h6'>Add Terms and Conditions</Typography>
                        <Typography variant='subtitle2'>Must be accepted by competitors and is displayed alongside rulebooks.</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body2' align='center'>{inputs?.terms}</Typography>
                        <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth disabled={disabled}>
                            + Upload
                            <input type="file" accept=".pdf" name="upload-terms" id="upload-terms" hidden onChange={(e) => handle.upload(e, 'terms')} />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                        <Typography variant='h6'>Add Privacy Policy</Typography>
                        <Typography variant='subtitle2'>Must be accepted by competitors and is displayed alongside rulebooks and terms and conditions.</Typography>
                    </Box>
                    <Box>
                        <Typography variant='body2' align='center'>{inputs?.privacy}</Typography>
                        <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth disabled={disabled}>
                            + Upload
                            <input type="file" accept=".pdf" name="upload-privacy" id="upload-privacy" hidden onChange={(e) => handle.upload(e, 'privacy')} />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={saving}
                        variant='contained'
                        onClick={handle.save}
                        disabled={disabled}
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
