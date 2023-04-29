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
import TeamTable from '@/src/components/TeamTable';
import UserInfo from '@/src/components/UserInfo';

const Page = (props) => {
    const router = useRouter();
    const theme = useTheme();
    const [uid, setUID] = useState(props.uid);
    const [item, setItem] = useState(null);
    const { setTitle } = useAppContext();
    const { player, team } = useTournamentContext();

    const handle = {
        show: (id) => {
            router.push('/team/' + id);
        },
        edit: (e) => {
            router.push('/user/' + uid + '/edit');
        }
    }

    useEffect(() => {
        setItem(player.players[uid]);
    }, [player.players, uid])

    useEffect(() => {
        if (router?.query?.uid) {
            const newUID = router.query.uid;
            if (player.players[newUID]) {
                setUID(router.query.uid);
            } else {
                console.error('Invalid User ID');
            }
        }
    }, [router])

    useEffect(() => {
        setTitle('USER PROFILE');
    }, [])

    return (
        <Paper sx={{ p: 4 }}>
            <Grid container spacing={2}>
                <Grid item sx={{ width: 300 }}>
                    <UserInfo avatar={item?.profilePic} item={item} editable={false} handle={handle.edit} />
                </Grid>
                <Grid item xs container>
                    <Box sx={{ border: 'solid 1px rgb(52, 43, 35)', width: '100%', borderRadius: '5px' }}>
                        <TeamTable teams={team.teams} uid={uid} handle={handle.show} showCreate={true} />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps(context) {
    const { params } = context;
    return {
        props: {
            uid: params.uid
        }
    }
}

export default Page;
