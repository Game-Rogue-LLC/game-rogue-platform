import { useState, useEffect } from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    useTheme
} from '@mui/material';
import { useRouter } from 'next/router';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useTournamentContext } from '@/src/context/TournamentContext';

const Page = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const [uid, setUID] = useState(null);
    const [item, setItem] = useState(null);
    const { setTitle } = useAppContext();
    const { player } = useTournamentContext();

    useEffect(() => {
        setItem(player.players[uid]);
    }, [uid])

    useEffect(() => {
        console.log(router.query.uid);
        if (router.query.uid)
            setUID(router.query.uid);
    }, [router])

    useEffect(() => {
        setTitle('USER PROFILE');
    }, [])

    return (
        <Paper sx={{ p: 4 }}>
            <Grid container spacing={2}>
                <Grid item sx={{ width: 300 }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Avatar alt={item?.name} src={item?.profilePic} sx={{ width: 150, height: 150, mx: 'auto' }} />
                    </Box>
                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                        <Button variant='contained' sx={{ mt: 2, mx: 'auto' }}>
                            EDIT PROFILE
                        </Button>
                    </Box>
                    <Box sx={{ mt: 4 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='b1' sx={{ fontWeight: '900' }}>
                                    ACCOUNT ID
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='b1'>
                                    {item?._id}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='b1' sx={{ fontWeight: '900' }}>
                                    USER NAME
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='b1'>
                                    {item?.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='b1' sx={{ fontWeight: '900' }}>
                                    AGE
                                </Typography>
                            </Grid>
                            <Grid>
                                <Typography variant='b1'>
                                    {item?.age}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='b1' sx={{ fontWeight: '900' }}>
                                    GENDER
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='b1'>
                                    {item?.gender == 0 ? 'Male' : 'Female'}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='b1' sx={{ fontWeight: '900' }}>
                                    RESIDENCY
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant='b1'>
                                    {item?.residency}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} container>
                </Grid>
            </Grid>
        </Paper>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;
