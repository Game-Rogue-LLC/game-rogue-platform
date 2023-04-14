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

import AdminLayout from '@/content/AdminLayout';
import { useAppContext } from '@/context/app';
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

    const handle = {
        join: async (e) => {
            team.check(inputs)
                .then(res => {
                    if (res.code === 'succeed') {
                        const newTeam = {
                            players: [
                                ...team.teams[inputs.id].players,
                                {
                                    id: user.id,
                                    position: 1, // Player
                                    joinedOn: new Date()
                                }
                            ]
                        };
                        team.update(inputs.id, newTeam)
                            .then(res => {
                                if (res.code === 'succeed') {
                                    router.push('/team/' + inputs.id);
                                }
                            })
                    } else if (res.code === 'failed') {
                        console.log(res.message)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
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
                    <Button variant='contained' onClick={handle.join}>
                        Join
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
