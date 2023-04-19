import * as React from 'react';
import Button from '@mui/material/Button';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    Typography,
    useTheme,
} from '@mui/material';
import People from '@mui/icons-material/People';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';

import { useRouter } from 'next/router';

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { organizations, addEvent, setTitle, current } = useAppContext();
    const [org, setOrg] = React.useState("");
    const [inputs, setInputs] = React.useState({ name: '' });
    const [valid, setValid] = React.useState({ name: true });
    const [disabled, setDisabled] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const handleOpen = (e) => {
        setOpen(true);
    }

    const handleClose = (e) => {
        setOpen(false);
    }

    const handleDelete = (e) => {
        deleteOrganization(orgId);
        setOpen(false)
    }

    const handleChange = (e) => {
        setOrg(e.target.value);
    }

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    React.useEffect(() => {
        setTitle('REGISTER AN EVENT');
    }, [])

    React.useEffect(() => {
        if (current.organization?.events?.length >= 5)
            setDisabled(true);
    }, [current])

    return (
        <Box>
            <Paper sx={{ p: 4 }}>
                <Typography variant='h6'>Disband/Delete Profile</Typography>
                <Button variant='contained' sx={{ borderRadius: 0, mt: 2 }} onClick={handleOpen}>Disband</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Delete the organizer profile?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Do you really want to delete this profile?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleDelete} autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>

            <Paper sx={{ p: 4, mt: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant='h6'>
                            Register Event
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Organization</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={org}
                                label="Organization"
                                onChange={handleChange}
                                variant="outlined"
                                disabled={disabled}
                            >
                                {organizations?.map((val, i) => <MenuItem key={val.id} value={val.id}>{val.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel htmlFor="event-name">Event Name</InputLabel>
                        <FormControl fullWidth error={!valid?.name} sx={{ mt: 1 }}>
                            <OutlinedInput id="event-name" name="name" aria-describedby="event-name-helper" value={inputs.name} disabled={disabled}
                                onChange={handleInputs} />
                            {!valid?.name && <FormHelperText id="event-name-helper" sx={{ mt: 2 }}>Name is required.</FormHelperText>}
                        </FormControl>
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
        </Box>
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;
