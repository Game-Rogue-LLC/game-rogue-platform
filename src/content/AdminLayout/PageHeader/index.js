import {
	Typography,
	useTheme
} from '@mui/material'

import { useAppContext } from '@/src/context/app';

const PageHeader = () => {
	const theme = useTheme();
	const { title, setTitle } = useAppContext();
	return (
		<>
			<Typography variant="h4" mb={2} color={theme.palette.primary.main} sx={{ fontStyle: 'italic' }}>
				{title}
			</Typography>
		</>
	)
}

export default PageHeader
