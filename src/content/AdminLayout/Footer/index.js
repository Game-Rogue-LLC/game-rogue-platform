import {
	Box,
	Card,
	Typography,
	useTheme,
} from '@mui/material'

const Footer = () => {

	const theme = useTheme()

	return (
	<Card>
		<Box p={3} sx={{
			textAlign: 'center',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			bgcolor: theme.palette.card.main
		}}>
			<Box sx={{flexGrow:1}}>
				<Typography variant="h6">Welcome to Game Rogue</Typography>
			</Box>
			<Box>
				<img src={'/GR_Letters.png'} style={{height:50}} />
			</Box>
		</Box>
	</Card>
	)
}

export default Footer
