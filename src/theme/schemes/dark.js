import { alpha, createTheme, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';

export default createTheme ({
	palette: {
		mode: 'dark',
		primary: {
			main: '#f5831f'
		},
		secondary: {
			main: '#440f06'
		},
		card: {
			main: '#180e05',
			darker: '#180e05'
		},
		backgroundColor: {
			header: '#28180a'
		},
		action : {
			selectedOpacity: .1
		}
	},
	typography: {
		fontFamily: 'ProximaNovaRegular, Industry',
		h1: {
			fontFamily: 'Industry'
		},
		h2: {
			fontFamily: 'Industry'
		},
		h3: {
			fontFamily: 'Industry'
		},
		h4: {
			fontFamily: 'Industry'
		},
		h5: {
			fontFamily: 'ProximaNovaRegular'
		},
		h6: {
			fontFamily: 'ProximaNovaRegular'
		},
		label: {
			fontFamily: 'ProximaNovaRegular'
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
		AppBar: {
			styleOverrides: {
				root: {
					backgroundColor: '#CCCACA'
				}
			}
		}
	}
})
