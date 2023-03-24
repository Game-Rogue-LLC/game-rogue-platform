import * as React from 'react';
import Button from '@mui/material/Button';
import {
    Box,
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

import AdminLayout from '@/content/AdminLayout';
import { AppContext } from '@/context/app';

import { useRouter } from 'next/router';

const Page = (props) => {
    const theme = useTheme();
    const router = useRouter();
    const { organization } = props;
    const { organizations, addEvent, setTitle, currentOrganization } = React.useContext(AppContext);
    const [org, setOrg] = React.useState(organization || "");
    const [inputs, setInputs] = React.useState({ name: '' });
	const [valid, setValid] = React.useState({ name: true });
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
        setOrg(router.query.organization)
    }, [router])

    const handleCreate = (e) => {
		if (!validate({ name: 'name', value: inputs?.name })) {
			return;
		}
		setValid({ name: true });
        addEvent({
            organization: org,
            icon: <People />,
            label: inputs.name
        })
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
        console.log(currentOrganization, '1')
        if (currentOrganization?.events?.length >= 5)
            setDisabled(true);
    }, [currentOrganization])

    return (
        <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
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
                            variant="standard"
                            disabled={disabled}
                        >
                            {organizations?.map((val, i) => <MenuItem value={val._id}>{val.name}</MenuItem>)}
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
