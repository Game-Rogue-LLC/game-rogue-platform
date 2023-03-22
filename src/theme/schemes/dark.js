import { alpha, createTheme, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';

export default createTheme ({
	palette: {
		mode: 'dark',
		primary: {
			main: '#f5831f',
		},
		card: {
			main: '#180e05',
			darker: '#180e05'
		},
		backgroundColor: {
			header: '#28180a'
		}
	},
	components: {
		MuiLink: {
			styleOverrides: {
				root: {
					textDecoration:'none'
				}
			}
		},
	}
})
