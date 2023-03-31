import * as React from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { makeStyles } from '@mui/styles'
import { useTheme } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import { useAppContext } from '@/context/app';

import routes from './routes'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        minHeight: "20px",
    }
}));

const NavItem = styled(Button)(({ theme }) => ({
    color: theme.palette.card.main,
    ':hover': {
        backgroundColor: alpha(theme.palette.card.main, theme.palette.action.selectedOpacity)
    }
}))

function Navbar() {
    const theme = useTheme()
    const { current } = useAppContext();
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
                // borderTop: `2px #f5831f solid`,
                // borderBottom: `2px #f5831f solid`,
                backgroundImage: 'none'
            }}>
            <Container maxWidth="xxl">
                <Toolbar classes={{ root: toolbarStyle.root }} disableGutters>

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
                            <NavItem
                                key={route.href}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'black', display: 'block' }}
                            >
                                <Link href={route.href}>
                                    {route.label}
                                </Link>
                            </NavItem>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {current.organization &&
                            <Tooltip title="Open settings">
                                <Box sx={{ height: '30px', position: 'relative', pr: 2 }}>
                                    <img src='/Game_Rogue_Text_2_copy.png' height={'100%'} />
                                </Box>
                            </Tooltip>}
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