import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Home from '@mui/icons-material/Home';
import Settings from '@mui/icons-material/Settings';
import { Menu, MenuItem } from '@mui/material';

import OrganizationMenu from './Menu'

import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';

import { AppContext } from '@/context/app';
import Link from 'next/link';

const events = [
	{ icon: <People />, label: 'Event 1' },
	{ icon: <Dns />, label: 'Event 2' },
	{ icon: <PermMedia />, label: 'Event 3' },
	{ icon: <Public />, label: 'Event 4' },
];

const organizations = [
	{
		_id: 1,
		name: 'Organization 1',
		description: "This is the organization or user",
		events : events,
	},
	{
		_id: 2,
		name: 'Organization 2',
		description: "This is the organization or user",
		events : events,
	},
	{
		_id: 3,
		name: 'Organization 3',
		description: "This is the organization or user",
		events : events,
	},
]

const FireNav = styled(List)(({theme})=>({
	'& .MuiPaper-root': {
		backgroundColor: theme.palette.primary.main,
	},
	'& .MuiListItemButton-root': {
		paddingLeft: 24,
		paddingRight: 24,
	},
	'& .MuiListItemIcon-root': {
		minWidth: 0,
		marginRight: 16,
	},
	'& .MuiSvgIcon-root': {
		fontSize: 20,
	},
}));

const FirePaper = styled(Paper)(({theme})=>({
	backgroundColor: theme.palette.card.darker,
	borderRadius: 0,
}));

export default function OrganizationSidebar(props) {
	const { organizations, current, setCurrent } = React.useContext(AppContext);
	const [showMenu, setShowMenu] = React.useState(false);
	const [anchorElMenu, setAnchorElMenu] = React.useState(null);

	const handleOpenMenu = (event) => {
	  setAnchorElMenu(event.currentTarget);
	};

	const handleCloseMenu = () => {
	  setAnchorElMenu(null);
	};

	const toggleShowMenu = (e) => {
		setShowMenu((prevState) => !prevState);
	}

	return (
    <Box sx={{ display: 'flex', boxShadow: '2px 0px 7px #301701ba', zIndex: 1, position: 'relative' }}>
		<Box sx={{
			position: 'relative',
			width: '300px',
			height: '100%'
		}}>
			<FirePaper elevation={0} sx={{ width: '100%', height: '100%', maxWidth: '100%', position: 'absolute', overflowX:'hidden', overflowY:'auto' }}>
				<FireNav component="nav" disablePadding>
					<ListItem key={"profile_container"} sx={{
							display: 'flex',
							flexFlow: 'column',
							alignItems: 'center',
							p: 2,
					}}>
						<Box>
							<Avatar alt="James Fury" src="/static/images/avatar/2.jpg" sx={{ width: 100, height: 100 }} />
						</Box>
						<Box sx={{mt:2}}>
							<Typography variant="h6">James, Fury</Typography>
						</Box>
					</ListItem>
					<Divider />
					<ListItem key={"profile_menu_container"} component="div" disablePadding>
						<ListItemButton sx={{ height: 56 }}>
							<ListItemIcon>
							<Home color="primary" />
							</ListItemIcon>
							<ListItemText
								primary={`James' s Profile`}
								primaryTypographyProps={{
									color: 'primary',
									fontWeight: 'medium',
									variant: 'body2',
								}}
							/>
						</ListItemButton>
						<Tooltip title="Events Settings">
							<IconButton
								size="large"
								sx={{
									'& svg': {
									color: 'rgba(255,255,255,0.8)',
									transition: '0.2s',
									transform: 'translateX(0) rotate(0)',
									},
									'&:hover, &:focus': {
									bgcolor: 'unset',
									'& svg:first-of-type': {
										transform: 'translateX(-4px) rotate(-20deg)',
									},
									'& svg:last-of-type': {
										right: 0,
										opacity: 1,
									},
									},
									'&:after': {
									content: '""',
									position: 'absolute',
									height: '80%',
									display: 'block',
									left: 0,
									width: '1px',
									bgcolor: 'divider',
									},
								}}
								onClick={handleOpenMenu}
							>
								<Settings />
								<ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="menu-appbar"
							anchorEl={anchorElMenu}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElMenu)}
							onClose={handleCloseMenu}
						>
							<MenuItem onClick={handleCloseMenu}>
								<Link href='/organization/create'>
									<Typography textAlign="center">Add Organization</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</ListItem>
					<Divider />
					{organizations.map((item)=> (
						!item?.deleted &&
						<OrganizationMenu key={"organization_menu_"+item._id} organization={item} />
					))}
				</FireNav>
			</FirePaper>
		</Box>
    </Box>
  );
}