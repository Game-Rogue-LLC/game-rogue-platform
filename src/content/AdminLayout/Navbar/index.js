import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import {makeStyles} from '@mui/styles'
import { Link, useTheme } from '@mui/material'

import routes from './routes'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const useStyles = makeStyles((theme) => ({
	root: {
		position: "relative",
		minHeight: "20px",
	}
}));

function Navbar() {
	const theme = useTheme ()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const toolbarStyle = useStyles(theme)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar 
		position="static" 
		sx={{
			borderTop: `2px #f5831f solid`,
			borderBottom: `2px #f5831f solid`,
			backgroundColor: theme.palette.card.darker,
			backgroundImage: 'none'
		}}>
		<Container maxWidth="xl">
			<Toolbar classes={{root:toolbarStyle.root}} disableGutters>

			<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
				<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
				>
				<MenuIcon />
				</IconButton>
				<Menu
				id="menu-appbar"
				anchorEl={anchorElNav}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left',
				}}
				open={Boolean(anchorElNav)}
				onClose={handleCloseNavMenu}
				sx={{
					display: { xs: 'block', md: 'none' },
				}}
				>
				{routes.map((route) => (
					<MenuItem key={route.href} onClick={handleCloseNavMenu}>
					<Typography textAlign="center">{route.label}</Typography>
					</MenuItem>
				))}
				</Menu>
			</Box>
			
			<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
				{routes.map((route) => (
					<Button
						key={route.href}
						onClick={handleCloseNavMenu}
						sx={{ my: 2, color: 'white', display: 'block' }}
					>
						<Link href={route.href}>
							{route.label}
						</Link>
					</Button>
				))}
			</Box>

			<Box sx={{ flexGrow: 0 }}>
				<Tooltip title="Open settings">
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
				</IconButton>
				</Tooltip>
				<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
				>
				{settings.map((setting) => (
					<MenuItem key={setting} onClick={handleCloseUserMenu}>
					<Typography textAlign="center">{setting}</Typography>
					</MenuItem>
				))}
				</Menu>
			</Box>
			</Toolbar>
		</Container>
    </AppBar>
  );
}
export default Navbar;