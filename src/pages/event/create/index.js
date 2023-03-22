import * as React from 'react';
import Button from '@mui/material/Button';
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    Input,
    MenuItem,
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
	const { organizations, addEvent } = React.useContext(AppContext);
    const [org, setOrg] = React.useState(organization || "");
	const [inputs, setInputs] = React.useState({
		name: '',
	})

    React.useEffect(()=>{
        setOrg (router.query.organization)
    }, [router])

	const handleCreate = (e) => {
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

	return (
		<Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
            <Grid container spacing={2}>
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
                        >
                            { organizations?.map((val, i) =>
                                <MenuItem value={val._id}>{val.name}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="org-name">Event Name</InputLabel>
                        <Input id="org-name" name="name" aria-describedby="org-name-helper" value={inputs.name}
                            onChange={handleInputs} />
                        <FormHelperText id="org-name-helper"></FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant='contained'
                        onClick={handleCreate}
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

export async function getServerSideProps(context){
	const cid = context.query.organization;
	return {
		props: {
			organization: cid,
		}
	}
}

export default Page;
