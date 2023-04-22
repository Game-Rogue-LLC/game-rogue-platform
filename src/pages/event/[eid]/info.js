import { useState, useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    Chip,
    Container,
    Grid,
    ListItemIcon,
    MenuItem,
    Paper,
    Select,
    Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import PublicLayout from '@/src/content/PublicLayout';
import { useAppContext } from '@/src/context/app';
import TournamentProvider, { useTournamentContext } from '@/src/context/TournamentContext';
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from '@/src/config/global';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { games } from '@/src/components/GameSelect';
import { EVENT_FORMATS } from '@/src/config/global';
import { useAuthContext } from '@/src/context/AuthContext';

const Page = (props) => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { setTitle } = useAppContext();
    const { event, team } = useTournamentContext();
    const [eid, setEID] = useState(router?.query?.eid);
    const [item, setItem] = useState(null);
    const [timer, setTimer] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [status, setStatus] = useState(0);
    const [myTeam, setMyTeam] = useState('');
    const [registering, setRegistering] = useState(false);

    useEffect(() => {
        setTitle('UPCOMING EVENTS');
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 10000)
        setTimer(interval);
        return () => {
            clearInterval(interval);
        }
    }, [])

    useEffect(() => {
        if (currentTime) {
            if (dayjs(currentTime).isAfter(dayjs(endTime))) setStatus(2);
            else if (dayjs(currentTime).isBefore(dayjs(startTime))) setStatus(0);
            else setStatus(1);
        }
    }, [currentTime])

    useEffect(() => {
        if (team?.teams && Object.keys(team.teams).length > 0) {
            setMyTeam(Object.keys(team.teams)[0]);
        }
    }, [team])

    useEffect(() => {
        if (router?.query?.eid) {
            setEID(router.query.eid);
        }
    }, [router])

    useEffect(() => {
        if (event?.events[eid]) {
            setItem(event.events[eid]);
            setStartTime(dayjs(event.events[eid].registerTo).subtract(event.events[eid].checkin, 'minute'));
            setEndTime(dayjs(event.events[eid].registerTo).add(event.events[eid].checkin, 'minute'));
        }
    }, [eid, event])

    const handleSelectTeam = (e) => {
        const { value } = e.target;
        setMyTeam(value);
    }

    const handleRegister = async (e) => {
        setRegistering(true);
        if (event.events[eid].participants?.length >= event.events[eid].participantsCount) {
            alert('Only ' + event.events[eid].participantsCount + ' participants are allowed.');
            setRegistering(false);
            return;
        }
        if (event.events[eid].participants?.findIndex(val => val.tid === myTeam) >= 0) {
            alert('This team is already registered.');
            setRegistering(false);
            return;
        }
        let newParticipants = event.events[eid]?.participants;
        if (!newParticipants) newParticipants = [];
        newParticipants = [
            ...newParticipants,
            {
                tid: myTeam,
                deleted: false,
                registeredAt: new Date()
            }
        ]

        const res = await event.update(eid, { participants: newParticipants })

        setRegistering(false);
        if (res.code === 'succeed') {
            if (organization.organizations[event.events[eid].oid].uid == user.id)
                router.push('/participant?event=' + eid);
            else alert('Registered Successfully!');
        } else if (res.code === 'failed') {
            console.error(res.message)
        }
    }

    return (
        <Box>
            <Box
                sx={{
                    background: 'url(' + item?.banner + ')',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: '500px'
                }}
            >
            </Box>
            <Box
                sx={{
                    height: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img
                    src={item?.darkLogo}
                    width={200}
                    height={200}
                    style={{
                        borderRadius: '50%',
                        outline: '1px solid rgba(245, 131, 31, 0.5)',
                        objectFit: 'cover',
                        outlineOffset: '2px'
                    }}
                />
            </Box>
            <Container sx={{ mt: '100px' }}>
                <Grid container spacing={2} rowSpacing={3} sx={{ mt: 2 }}>
                    <Grid item xs={12} lg={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant='h4'>
                                Description
                            </Typography>
                            <Typography variant='body1'>
                                {item?.description}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6} container spacing={2} rowSpacing={2}>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Typography variant='h4'>
                                    Registration
                                </Typography>
                                <Typography variant='body2' sx={{ mt: 1 }}>
                                    {startTime.toLocaleString()}
                                    &nbsp;-&nbsp;
                                    {endTime.toLocaleString()}
                                </Typography>
                                {
                                    status == 0
                                        ?
                                        <Chip label='Register' sx={{ mt: 1 }} />
                                        :
                                        <Chip label='Closed' sx={{ mt: 1 }} />
                                }
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Typography variant='h4'>
                                    Game
                                </Typography>
                                <Typography variant='body2' sx={{ mt: 1 }}>
                                    {games[item?.game]}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Typography variant='h4'>
                                    Platform
                                </Typography>
                                <Typography variant='body2' sx={{ mt: 1 }}>
                                    <Chip label={'PC'} />
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <Paper sx={{ p: 3, height: '100%' }}>
                                <Typography variant='h4'>
                                    Format
                                </Typography>
                                <Typography variant='body2' sx={{ mt: 1 }}>
                                    {EVENT_FORMATS[item?.format]?.name}
                                </Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper sx={{ p: 3 }}>
                                <Select
                                    labelId="team-select-label"
                                    id="team-select"
                                    value={myTeam}
                                    name="team"
                                    size='small'
                                    onChange={handleSelectTeam}
                                    variant="outlined"
                                    sx={{
                                        mt: 1
                                    }}
                                    fullWidth
                                >
                                    {team?.teams && Object.keys(team.teams).filter(key => team.teams[key].uid === user.id).map(tid => {
                                        const item = team.teams[tid];
                                        return (
                                            <MenuItem key={'team_' + item.id} value={item.id} sx={{ display: 'flex', alignItems: 'center' }}>
                                                <ListItemIcon>
                                                    <img
                                                        src={item?.darkLogo || DEFAULT_CONTENTBLOCK_IMAGE}
                                                        height={25}
                                                        width={25}
                                                        style={{
                                                            objectFit: 'cover',
                                                            objectPosition: 'center'
                                                        }}
                                                    />
                                                </ListItemIcon>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                                <LoadingButton
                                    loading={registering}
                                    variant='contained' sx={{ width: '100%', mt: 1 }}
                                    onClick={handleRegister}
                                >
                                    Register to an event
                                </LoadingButton>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

Page.getLayout = (page) => {
    return (
        <PublicLayout>
            <TournamentProvider>
                {page}
            </TournamentProvider>
        </PublicLayout>
    )
}

export default Page;