import {
	Typography
} from '@mui/material'

import { useTheme } from '@mui/material'

const PageHeader = () => {
	const theme = useTheme()
	return (
	<>
		<Typography variant="h4" mb={2} color={theme.palette.primary.main}>
			Welcome to Game Rogue
		</Typography>
	</>
	)
}

export default PageHeader
