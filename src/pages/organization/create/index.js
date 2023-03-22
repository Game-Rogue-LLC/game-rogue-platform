import * as React from 'react';
import Button from '@mui/material/Button';

import AdminLayout from '@/content/AdminLayout'

const Page = (props) => {
	return (
		<div>
			create...
		</div>
	);
}

Page.getLayout = (page) => {
	return <AdminLayout>{page}</AdminLayout>
}

export default Page;
