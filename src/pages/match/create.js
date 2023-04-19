import { useEffect, useState } from 'react'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Typography,
    useTheme,
} from '@mui/material'
import { useRouter } from 'next/router'
import { LoadingButton } from '@mui/lab'

import AdminLayout from '@/src/content/AdminLayout'
import { useAppContext } from '@/src/context/app'
import DatePicker from '@/src/pages/components/DatePicker'
import { useMatchContext } from '@/src/context/MatchContext'
import { useTournamentContext } from '@/src/context/TournamentContext'

const initialInputs = {
    eid: '',
    status: 0,
    admin: 0,
    category: 0,
    schedule: 0,
    deleted: false
}

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { setTitle } = useAppContext();
    const { organization, event } = useTournamentContext();
    const { match } = useMatchContext();
    const [saving, setSaving] = useState(false);
    const [inputs, setInputs] = useState({ ...initialInputs });
    const [disabled, setDisabled] = useState(false);
    const [eid, setEID] = useState(router?.query.event);

    const handle = {
        create: async (e) => {
            const newMatch = {
                ...inputs,
                _id: new Date().getTime(),
                createdAt: new Date()
            }
            setSaving(true)
            const res = await match.add(newMatch)
            if (res.code === 'succeed') {
                alert('Match data saved successfully!')
            } else if (res.code === 'failed') {
                console.log(res.message)
            }
            setSaving(false)
            setInputs({ ...initialInput })
        },
        inputs: (e) => {
            const { name, value } = e.target
            setInputs({
                ...inputs,
                [name]: value
            })
        }
    }

    const setDate = (newDate) => {
        setInputs(prev => ({
            ...prev,
            date: new Date(newDate)
        }))
    }

    useEffect(() => {
        setTitle('ORGANIZE A MATCH')
    }, [])

    useEffect(() => {
        if (router?.query.event) {
            const newEID = router.query.event;
            setEID(newEID);
            event.setCurrent(newEID);
            organization.setCurrent(event.events[newEID]?.oid);
            setInputs(prev => ({
                ...prev,
                eid: newEID
            }))
        }
    }, [router])

    return (
        <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
            <Grid container spacing={2} rowSpacing={4}>
                <Grid item xs={12}>
                    <Typography variant='h6'>Status</Typography>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        value={inputs?.status}
                        onChange={handle.inputs}
                        variant="outlined"
                        name="status"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        {match.states.map((item, i) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Admin</Typography>
                    <Select
                        labelId="admin-select-label"
                        id="admin-select"
                        value={inputs?.admin}
                        name="admin"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        {match.admins.map((item, i) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Category</Typography>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        value={inputs?.category}
                        name="category"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        {match.categories.map((item, i) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6'>Schedule</Typography>
                    <Select
                        labelId="schedule-select-label"
                        id="schedule-select"
                        value={inputs?.schedule}
                        name="schedule"
                        onChange={handle.inputs}
                        variant="outlined"
                        disabled={disabled}
                        sx={{ mt: 1 }}
                        fullWidth
                    >
                        {match.schedules.map((item, i) => <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>)}
                    </Select>
                </Grid>
                <Grid item xs={12} hidden={inputs?.schedule < 2}>
                    <Typography variant='h6'>Schedule</Typography>
                    <DatePicker value={inputs?.date} setValue={setDate} sx={{ mt: 1, width: '100%' }} disabled={disabled} />
                </Grid>
                <Grid item xs={12}>
                    <LoadingButton
                        loading={saving}
                        variant='contained'
                        onClick={handle.create}
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
