import * as React from 'react';
import Button from '@mui/material/Button';

import AdminLayout from '@/content/AdminLayout'

const MyApp = (props) => {
	return (
		<div>
			<Button variant="contained">Hello World</Button>
		</div>
	);
}

MyApp.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default MyApp;
