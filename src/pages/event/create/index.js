import * as React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Typography,
    useTheme,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Event } from '@mui/icons-material';

import AdminLayout from '@/content/AdminLayout';
import { useAppContext } from '@/context/app';
import DatePicker from '@/pages/components/DatePicker';

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { organization } = props;
    const { organizations, addEvent, title, setTitle, current } = useAppContext();
    const [orgId, setOrgId] = React.useState(organization || "");
    const [inputs, setInputs] = React.useState({
        name: '',
        format: 0,
        tournament: 0,
        league: 0,
        seed: 0,
        date: new Date(),
        game: 0,
        platform: 0,
        region: 0,
        timezone: 0,
        rulebook: '*.pdf',
        terms: '*.pdf',
        privacy: '*.pdf'
    });
    const [valid, setValid] = React.useState({
        name: true
    });
    const [disabled, setDisabled] = React.useState(false);

    const validate = ({ name, value }) => {
        if (value) {
            setValid(prevState => ({ ...prevState, [name]: true }));
            return true;
        } else {
            setValid(prevState => ({ ...prevState, [name]: false }));
            return false;
        }
    }

    React.useEffect(() => {
        setOrgId(router.query.organization)
    }, [router])

    const setDate = (newDate) => {
        setInputs(prev => ({
            ...prev,
            date: newDate
        }))
    }

    const handleCreate = (e) => {
        if (!validate({ name: 'name', value: inputs?.name })) {
            return;
        }
        setValid({ name: true });
        const newEvent = {
            _id: new Date().getTime(),
            organization: orgId,
            icon: <Event />,
            label: inputs.name
        }
        addEvent({
            ...newEvent
        })
        router.push(`/event/match/${newEvent._id}`);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const handleUpload = (e, name) => {
        setInputs(prev => ({
            ...prev,
            [name]: e.target?.files[0]?.name
        }))
    }

    React.useEffect(() => {
        setTitle('REGISTER AN EVENT');
    }, [])

    React.useEffect(() => {
        if (current.organization?.events?.length >= 5)
            setDisabled(true);
    }, [current])

    return (
        <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
            <Grid container spacing={2} rowSpacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h6'>Organization</Typography>
                    <Select
                        labelId="organization-select-label"
                        id="organization-select"
                        value={orgId}
                        onChange={handleChange}
                        variant="outlined"
                        name="organization"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        {organizations?.map((val, i) => <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant='h6'>Event Format</Typography>
                    <Select
                        labelId="format-select-label"
                        id="format-select"
                        value={inputs?.format}
                        name="format"
                        onChange={handleChange}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='tournament' value={0}>Tournament</MenuItem>
                        <MenuItem key='league' value={1}>League</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant='h6'>Game Type</Typography>
                    <Box sx={{ mt: 1 }}>
                        {inputs?.format == 0 ?
                            <Select
                                labelId="tournament-select-label"
                                id="tournament-select"
                                value={inputs?.tournament}
                                name="tournament"
                                onChange={handleChange}
                                variant="outlined"
                                disabled={disabled}
                                fullWidth
                            >
                                <MenuItem key='single-elimination' value={0}>Single Elimination</MenuItem>
                                <MenuItem key='double-elimination' value={1}>Double Elimination</MenuItem>
                                <MenuItem key='ladder-elimination' value={2}>Ladder Elimination</MenuItem>
                                <MenuItem key='pyramid-elimination' value={3}>Pyramid Elimination</MenuItem>
                            </Select>
                            :
                            <Select
                                labelId="league-select"
                                id="league-select-temp"
                                value={inputs?.league}
                                name="league"
                                onChange={handleChange}
                                variant="outlined"
                                disabled={disabled}
                                fullWidth
                            >
                                <MenuItem key='straight-round-robin' value={0}>Straight Round Robin</MenuItem>
                                <MenuItem key='round-robin-double-split' value={1}>Round Robin Double Split</MenuItem>
                                <MenuItem key='round-robin-triple-split' value={2}>Round Robin Triple Split</MenuItem>
                                <MenuItem key='round-robin-quadruple-split' value={3}>Round Robin Quadruple Split</MenuItem>
                                <MenuItem key='semi-round-robin' value={4}>Semi Round Robin</MenuItem>
                            </Select>}
                    </Box>
                </Grid>
                <Grid item xs={12} lg={4}>
                    <Typography variant='h6'>Event Seed</Typography>
                    <Select
                        labelId="seed-select-label"
                        id="seed-select"
                        value={inputs?.seed}
                        name="seed"
                        onChange={handleChange}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        <MenuItem key='manual' value={0}>Manual</MenuItem>
                        <MenuItem key='random' value={1}>Random</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Event Name</Typography>
                    <FormControl fullWidth error={!valid?.name} sx={{ mt: 1 }}>
                        <OutlinedInput id="event-name" name="name" aria-describedby="event-name-helper" value={inputs.name} disabled={disabled}
                            onChange={handleInputs} />
                        {!valid?.name && <FormHelperText id="event-name-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Event Date</Typography>
                    <DatePicker value={inputs.date} setValue={setDate} sx={{ mt: 1 }} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant='h6'>Game</Typography>
                    <Select
                        labelId="game-select-label"
                        id="game-select"
                        value={inputs?.game}
                        name="game"
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth>
                            + Upload
                            <input type="file" accept=".pdf" name="upload-rulebook" id="upload-rulebook" hidden onChange={(e) => handleUpload(e, 'rulebook')} />
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
                        <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth>
                            + Upload
                            <input type="file" accept=".pdf" name="upload-terms" id="upload-terms" hidden onChange={(e) => handleUpload(e, 'terms')} />
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
                        <Button variant="outlined" sx={{ mt: 1 }} component="label" fullWidth>
                            + Upload
                            <input type="file" accept=".pdf" name="upload-privacy" id="upload-privacy" hidden onChange={(e) => handleUpload(e, 'privacy')} />
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12}>
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

export async function getServerSideProps(context) {
    const cid = context.query.organization;
    return {
        props: {
            organization: cid,
        }
    }
}

export default Page;
