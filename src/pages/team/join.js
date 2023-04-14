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
    OutlinedInput
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useRouter } from 'next/router';
import { useOrganizationContext } from '@/src/context/OrganizationContext';
import { useTournamentContext } from '@/src/context/TournamentContext';
import CountrySelect from '@/src/pages/components/CountrySelect';
import GameSelect from '@/src/pages/components/GameSelect';
import { useAuthContext } from '@/src/context/AuthContext';

const initialInputs = {
    id: '',
    accessCode: ''
}

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { user } = useAuthContext();
    const { setTitle } = useAppContext();
    const { addOrganization, activeCount } = useOrganizationContext();
    const [inputs, setInputs] = useState({ ...initialInputs });
    const [valid, setValid] = useState({ name: true });
    const [disabled, setDisabled] = useState(false);
    const { team } = useTournamentContext();
    const [joining, setJoining] = useState(false);

    const joinTeam = async (data) => {
        setJoining(true);
        const res = await team.check(data)
        if (res.code === 'succeed' && team.teams[data.id].players.findIndex(val => val.id == user.id) < 0) {
            const newTeam = {
                players: [
                    ...team.teams[data.id].players,
                    {
                        id: user.id,
                        position: 1, // Player
                        joinedOn: new Date()
                    }
                ]
            }
            const upd = await team.update(data.id, newTeam);
            if (upd.code === 'succeed') {
                router.push('/team/' + data.id);
            }
        } else {
            console.log(res.message);
        }
        setJoining(false);
    }

    const handle = {
        join: async (e) => {
            joinTeam(inputs);
        },
        inputs: async (e) => {
            const { name, value } = e.target;
            setInputs({
                ...inputs,
                [name]: value
            })
        }
    }

    useEffect(() => {
        const { id, accessCode } = router.query
        if (id !== undefined && accessCode !== undefined) {
            joinTeam({
                id,
                accessCode
            })
        }
    }, [router])

    useEffect(() => {
        setTitle('JOIN A TEAM');
    }, [])

    return (
        <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
            <Grid container rowSpacing={3} spacing={2}>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-id">Team Name</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput id="team-id" name="id" value={inputs.id} onChange={handle.inputs}
                            sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputLabel htmlFor="team-access-code">Access Code</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput id="team-access-code" name="accessCode" value={inputs.accessCode}
                            onChange={handle.inputs} sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item>
                    <LoadingButton
                        loading={joining}
                        variant='contained'
                        onClick={handle.join}
                    >
                        Join
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
