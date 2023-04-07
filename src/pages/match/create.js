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

import AdminLayout from '@/content/AdminLayout'
import { useAppContext } from '@/context/app'
import DatePicker from '@/pages/components/DatePicker'
import { useOrganizationContext } from '@/context/OrganizationContext'
import { useEventContext } from '@/context/EventContext'
import { useMatchContext } from '@/src/context/MatchContext'

const Page = (props) => {
    const theme = useTheme()
    const router = useRouter()
    const { setTitle } = useAppContext()
    const { organizations, setCurrent: setCurrentOrganization } = useOrganizationContext()
    const {
        events,
        addEvent,
        updateEvent,
        activeCount: activeEventCount,
        current: currentEvent,
        setCurrent: setCurrentEvent,
        uploadFile
    } = useEventContext()
    const { match } = useMatchContext()
    const initialInput = {
        eid: '',
        status: 0,
        admin: 0,
        category: 0,
        schedule: 0
    }
    const [saving, setSaving] = useState(false)
    const [inputs, setInputs] = useState({ ...initialInput })
    const [disabled, setDisabled] = useState(false);
    const event = router?.query.event

    const handle = {
        create: async (e) => {
            const newMatch = {
                ...inputs,
                _id: new Date().getTime(),
                created: new Date()
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
            date: newDate
        }))
    }

    useEffect(() => {
        setTitle('ORGANIZE A MATCH')
    }, [])

    useEffect(() => {
        initialInput.eid = currentEvent
        setInputs(prev => ({
            ...prev,
            eid: currentEvent
        }))
    }, [currentEvent])

    useEffect(() => {
        setCurrentEvent(event)
        setCurrentOrganization(events[event]?.oid)
    }, [events, event])

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
