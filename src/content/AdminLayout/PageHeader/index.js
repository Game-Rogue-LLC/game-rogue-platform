import {
	Typography,
	useTheme
} from '@mui/material'
import { useContext } from 'react';

import { AppContext } from '@/context/app';

const PageHeader = () => {
	const theme = useTheme();
	const { title, setTitle } = useContext(AppContext);
	return (
	<>
		<Typography variant="h4" mb={2} color={theme.palette.primary.main} sx={{ fontStyle: 'italic' }}>
			{title}
		</Typography>
	</>
	)
}

export default PageHeader
