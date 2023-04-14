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

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import { useRouter } from 'next/router';
import { useOrganizationContext } from '@/src/context/OrganizationContext';
import { useTournamentContext } from '@/src/context/TournamentContext';
import CountrySelect from '@/src/pages/components/CountrySelect';
import GameSelect from '@/src/pages/components/GameSelect';
import { useAuthContext } from '@/src/context/AuthContext';

const initialInputs = {
    name: '',
    short: '',
    accessCode: '',
    residency: '',
    game: '',
    players: []
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

    const handle = {
        create: async (e) => {
            const newTeam = {
                ...inputs,
                uid: user.id,
                deleted: false,
                players: [{
                    id: user.id,
                    position: 0, // Manager
                    joinedOn: new Date()
                }]
            };
            team.create(newTeam)
                .then(res => {
                    if (res.code === 'succeed') {
                        router.push('/team/' + res.id)
                    } else if (res.code === 'failed') {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            setInputs({ ...initialInputs });
        },
        inputs: (e) => {
            const { name, value } = e.target;
            setInputs({
                ...inputs,
                [name]: value
            })
        }
    }

    useEffect(() => {
        console.log(inputs)
    }, [inputs])

    useEffect(() => {
        setTitle('REGISTER A TEAM');
    }, [])

    return (
        <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
            <Grid container rowSpacing={3} spacing={2}>
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
                <Grid item xs={12} md={4}>
                    <InputLabel htmlFor="team-access-code">Access Code</InputLabel>
                    <FormControl fullWidth>
                        <OutlinedInput id="team-access-code" name="accessCode" value={inputs.accessCode}
                            onChange={handle.inputs} sx={{ mt: 1 }} fullWidth required />
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                    <InputLabel htmlFor="team-residency">Residency</InputLabel>
                    <CountrySelect sx={{ mt: 1, width: '100%' }} option={inputs.residency}
                        setOption={(val) => setInputs(prev => ({ ...prev, residency: val }))} />
                </Grid>
                <Grid item xs={12} md={4}>
                    <InputLabel htmlFor="team-game">Game</InputLabel>
                    <GameSelect sx={{ mt: 1, width: '100%' }} option={inputs.game}
                        setOption={(val) => setInputs(prev => ({ ...prev, game: val }))} />
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={handle.create}>
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
