import * as React from 'react';
import Button from '@mui/material/Button';

import AdminLayout from '@/content/AdminLayout'

const MyApp = (props) => {
	return (
		<div>
			<Button variant="contained">Primary</Button>
			<Button variant="contained" color="secondary">Secondary</Button>
			<Button variant="contained" color="error">Error</Button>
			<Button variant="contained" color="warning">Warning</Button>
			<Button variant="contained" color="info">Info</Button>
			<Button variant="contained" color="success">Success</Button>
		</div>
	);
}

MyApp.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default MyApp;
