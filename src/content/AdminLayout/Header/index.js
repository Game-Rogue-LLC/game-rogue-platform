import {
	Avatar,
	Button,
	MenuItem,
	Menu,
	Divider,
	Box,
	IconButton,
	Link,
	useTheme,
} from "@mui/material"

import { styled, alpha } from '@mui/material/styles';
import {useState} from "react"

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			borderRadius: 0,
			// backgroundColor: '#000',
			marginTop: theme.spacing(1),
			padding: theme.spacing (2),
			minWidth: 180,
			color:
				theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '0 10px',
		},
		'& .MuiMenuItem-root': {
			fontSize: 10,
			color: theme.palette.primary.main,
			// marginRight: theme.spacing(1.5),
			justifyContent: 'center',
			textAlign: 'center',
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const theme = useTheme();
	const handleClick = (event) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};

	return (
	<div style={{
		backgroundColor: theme.palette.backgroundColor.header,
		height: 80,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		zIndex: 2,
		position: 'relative',
	}}>
		<Box sx={{
			height: '100%',
			padding: '1.6em',
			flex: 1
		}}>
			<img src={'/Game_Rogue_Text_2_copy.png'} style={{height:'100%'}} />
		</Box>
		<Box sx={{
			display: 'flex',
			justifyContent: 'flex-end'
		}}>
			<Button
				id="demo-customized-button"
				aria-controls={open ? 'demo-customized-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				// variant="contained"
				disableElevation
				onClick={handleClick}
				sx={{
					m: 'auto'
				}}
				// endIcon={<KeyboardArrowDownIcon />}
			>
				ORGANISE
			</Button>
			<IconButton sx={{ pr: 6 }}>
				<Avatar alt="James Fury" src="/static/images/avatar/2.jpg" />
			</IconButton>
		</Box>
		<StyledMenu
			id="demo-customized-menu"
			MenuListProps={{
				'aria-labelledby': 'demo-customized-button',
			}}
			anchorEl={anchorEl}
			open={open}
			onClose={handleClose}
		>
			<MenuItem onClick={handleClose} disableRipple>
				<Link href="/organization/create">
					CREATE
				</Link>
			</MenuItem>
			<Divider sx={{ my: 0.5 }} />
			<MenuItem onClick={handleClose} disableRipple>
				PRODUCTION SETTING
			</MenuItem>
		</StyledMenu>
	</div>
	)
}

export default Header
