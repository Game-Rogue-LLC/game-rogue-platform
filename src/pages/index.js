import * as React from 'react';
import Button from '@mui/material/Button';

import AdminLayout from '@/content/AdminLayout'
import { useAppContext } from '@/srccontext/app';

const MyApp = (props) => {
	const { setTitle } = useAppContext();
	React.useEffect(() => {
		setTitle('Welcome to Game Rogue');
	}, [])
	return (
		<div>
		</div>
	);
}

MyApp.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default MyApp;
