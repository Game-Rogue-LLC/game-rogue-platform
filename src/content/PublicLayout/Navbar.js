import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Toolbar,
    IconButton,
    InputAdornment,
    Menu,
    MenuItem,
    OutlinedInput,
    Typography,
    FormControl,
    styled,
    useTheme
} from '@mui/material';
import {
    Search,
    Logout,
    Login,
    Person
} from '@mui/icons-material';
import { useAuthContext } from '@/src/context/AuthContext';
import { useRouter } from 'next/router';

const StyledMenu = styled((props) => (
    <Menu {...props} />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#0f0f0f',
        borderRadius: 0,
        // backgroundColor: '#000',
        marginTop: theme.spacing(1),
        padding: theme.spacing(1),
        minWidth: 180,
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '0 10px',
        },
        '& .MuiMenuItem-root': {
            color: 'white',
            // marginRight: theme.spacing(1.5),
            justifyContent: 'center',
            textAlign: 'center',
            '&:hover': {
                color: theme.palette.primary.main,
                backgroundColor: 'transparent'
            },
        },
    },
}));

const Navbar = (props) => {
    const user = useAuthContext();
    const router = useRouter();
    const theme = useTheme();
    const [logoNav, setLogoNav] = useState(true);
    const [search, setSearch] = useState('');
    const [fund, setFund] = useState('');
    const [anchorElRogueSocial, setAnchorElRogueSocial] = useState(null);
    const [anchorElOrganize, setAnchorElOrganize] = useState(null);
    const [anchorElSupport, setAnchorElSupport] = useState(null);
    const [anchorElTools, setAnchorElTools] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const openRogueSocial = Boolean(anchorElRogueSocial);
    const openOrganize = Boolean(anchorElOrganize);
    const openSupport = Boolean(anchorElSupport);
    const openTools = Boolean(anchorElTools);
    const openUser = Boolean(anchorElUser);

    const handle = {
        switchLogoNav: (e) => {
            setLogoNav(prev => !prev);
        },
        changeSearch: (e) => {
            setSearch(e.target.value);
        },
        changeFund: (e) => {
            setFund(e.target.value);
        }
    }

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    }
    const handleCloseUser = () => {
        setAnchorElUser(null);
    }

    const handleClickOrganize = (event) => {
        setAnchorElOrganize(event.currentTarget);
    }
    const handleCloseOrganize = () => {
        setAnchorElOrganize(null);
    }

    const handleClickRogueSocial = (event) => {
        setAnchorElRogueSocial(event.currentTarget);
    }
    const handleCloseRogueSocial = () => {
        setAnchorElRogueSocial(null);
    }

    const handleClickSupport = (event) => {
        setAnchorElSupport(event.currentTarget);
    }
    const handleCloseSupport = () => {
        setAnchorElSupport(null);
    }

    const handleClickTools = (event) => {
        setAnchorElTools(event.currentTarget);
    }
    const handleCloseTools = () => {
        setAnchorElTools(null);
    }

    return (

        <AppBar
            position='fixed'
            sx={{
                height: '73px',
                // backgroundColor: 'rgba(0, 0, 0, 0.2)'
                backgroundColor: 'black',
                backgroundImage: 'none'
            }}
        >
            <Container maxWidth="xxl" sx={{ borderBottom: 'solid 3px #f5831f' }}>
                <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 8, alignItems: 'center' }}>
                        <FormControl>
                            <OutlinedInput id="search" name="search" placeholder='Search' value={search} onChange={handle.changeSearch}
                                sx={{
                                    height: '40px'
                                }}
                                startAdornment={
                                    <InputAdornment position='start'>
                                        <Search fontSize='large' />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Button
                            sx={{
                                background: 'transparent',
                                color: 'white',
                                ':hover': {
                                    color: theme.palette.primary.main,
                                    background: 'transparent'
                                }
                            }}
                            disableRipple
                            id='rogue-social-button'
                            aria-controls={openRogueSocial ? 'rogue-social-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={openRogueSocial ? 'true' : undefined}
                            // variant="contained"
                            disableElevation
                            onClick={handleClickRogueSocial}
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    ':hover': {
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                ROGUE SOCIAL
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                background: 'transparent',
                                color: 'white',
                                ':hover': {
                                    color: theme.palette.primary.main,
                                    background: 'transparent'
                                }
                            }}
                            disableRipple
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    ':hover': {
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                LIVE
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                background: 'transparent',
                                color: 'white',
                                ':hover': {
                                    color: theme.palette.primary.main,
                                    background: 'transparent'
                                }
                            }}
                            disableRipple
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    ':hover': {
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                ARTICLES
                            </Typography>
                        </Button>
                        <Button
                            sx={{
                                background: 'transparent',
                                color: 'white',
                                ':hover': {
                                    color: theme.palette.primary.main,
                                    background: 'transparent'
                                }
                            }}
                            disableRipple
                        >
                            <Typography
                                variant='h4'
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    ':hover': {
                                        color: theme.palette.primary.main
                                    }
                                }}
                            >
                                SHOP
                            </Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 8, alignItems: 'center' }}>
                            <Button
                                sx={{
                                    background: 'transparent',
                                    color: 'white',
                                    ':hover': {
                                        color: theme.palette.primary.main,
                                        background: 'transparent'
                                    }
                                }}
                                disableRipple
                                id={'organize-button'}
                                aria-controls={openOrganize ? 'organize-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openOrganize ? 'true' : undefined}
                                // variant="contained"
                                disableElevation
                                onClick={handleClickOrganize}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: 'white',
                                        fontSize: '1rem',
                                        ':hover': {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    ORGANIZE
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    background: 'transparent',
                                    color: 'white',
                                    ':hover': {
                                        color: theme.palette.primary.main,
                                        background: 'transparent'
                                    }
                                }}
                                disableRipple
                                id={'tools-button'}
                                aria-controls={openTools ? 'tools-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openTools ? 'true' : undefined}
                                // variant="contained"
                                disableElevation
                                onClick={handleClickTools}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: 'white',
                                        fontSize: '1rem',
                                        ':hover': {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    TOOLS
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    background: 'transparent',
                                    color: 'white',
                                    ':hover': {
                                        color: theme.palette.primary.main,
                                        background: 'transparent'
                                    }
                                }}
                                disableRipple
                                id={'support-button'}
                                aria-controls={openSupport ? 'support-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openSupport ? 'true' : undefined}
                                // variant="contained"
                                disableElevation
                                onClick={handleClickSupport}
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: 'white',
                                        fontSize: '1rem',
                                        ':hover': {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    SUPPORT
                                </Typography>
                            </Button>
                            <Button
                                sx={{
                                    background: 'transparent',
                                    color: 'white',
                                    ':hover': {
                                        color: theme.palette.primary.main,
                                        background: 'transparent'
                                    }
                                }}
                                disableRipple
                            >
                                <Typography
                                    variant='h4'
                                    sx={{
                                        color: 'white',
                                        fontSize: '1rem',
                                        ':hover': {
                                            color: theme.palette.primary.main
                                        }
                                    }}
                                >
                                    PLUS PLANS
                                </Typography>
                            </Button>
                        </Box>
                        {
                            user.user
                                ?
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    <OutlinedInput id="fund" name="fund" placeholder='Add fund' value={fund} onChange={handle.changeFund}
                                        sx={{
                                            height: '40px'
                                        }}
                                    />
                                    <IconButton
                                        id='user-button'
                                        aria-controls={openUser ? 'user-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={openUser ? 'true' : undefined}
                                        onClick={handleClickUser}
                                    >
                                        <Avatar alt={user.user?.name} src={user.user?.profilePic} />
                                    </IconButton>
                                    <IconButton onClick={user?.logout} sx={{ h: 'auto' }}>
                                        <Logout />
                                    </IconButton>
                                </Box>
                                :
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2
                                    }}
                                >
                                    <IconButton onClick={() => router.push('/auth')} sx={{ h: 'auto' }}>
                                        <Person />
                                    </IconButton>
                                    <IconButton onClick={() => router.push('/auth')} sx={{ h: 'auto' }}>
                                        <Login />
                                    </IconButton>
                                </Box>
                        }
                    </Box>
                </Toolbar>
                {/** Menus from NavBar Items */}
                <StyledMenu
                    id="rogue-social-menu"
                    MenuListProps={{
                        'aria-labelledby': 'rogue-social-button',
                    }}
                    disablePortal={true}
                    disableScrollLock={true}
                    keepMounted
                    anchorEl={anchorElRogueSocial}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={openRogueSocial}
                    onClose={handleCloseRogueSocial}
                >
                    <MenuItem onClick={handleCloseRogueSocial} key='teams' disableRipple>
                        <Link href={"/team"}>
                            TEAMS
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseRogueSocial} key='scouting' disableRipple>
                        <Link href={"/team"}>
                            SCOUTING
                        </Link>
                    </MenuItem>
                </StyledMenu>
                <StyledMenu
                    id="organize-menu"
                    MenuListProps={{
                        'aria-labelledby': 'organize-button',
                    }}
                    disablePortal={true}
                    disableScrollLock={true}
                    keepMounted
                    anchorEl={anchorElOrganize}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={openOrganize}
                    onClose={handleCloseOrganize}
                >
                    <MenuItem onClick={handleCloseOrganize} key='create-organization' disableRipple>
                        <Link href={"/organization/create"}>
                            CREATE
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseOrganize} key='production-settings' disableRipple>
                        <Link href={"/"}>
                            PRODUCTION SETTINGS
                        </Link>
                    </MenuItem>
                </StyledMenu>
                <StyledMenu
                    id="tools-menu"
                    MenuListProps={{
                        'aria-labelledby': 'tools-button',
                    }}
                    disablePortal={true}
                    disableScrollLock={true}
                    keepMounted
                    anchorEl={anchorElTools}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={openTools}
                    onClose={handleCloseTools}
                >
                    <MenuItem onClick={handleCloseTools} key='instant-video' disableRipple>
                        <Link href={"/"}>
                            INSTANT VIDEO
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseTools} key='instant-media' disableRipple>
                        <Link href={"/"}>
                            INSTANT MEDIA
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseTools} key='instant-articlese' disableRipple>
                        <Link href={"/"}>
                            INSTANT ARTICLES
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseTools} key='start-production' disableRipple>
                        <Link href={"/"}>
                            START PRODUCTION
                        </Link>
                    </MenuItem>
                </StyledMenu>
                <StyledMenu
                    id="support-menu"
                    MenuListProps={{
                        'aria-labelledby': 'support-button',
                    }}
                    disablePortal={true}
                    disableScrollLock={true}
                    keepMounted
                    anchorEl={anchorElSupport}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center'
                    }}
                    open={openSupport}
                    onClose={handleCloseSupport}
                >
                    <MenuItem onClick={handleCloseSupport} key='tickets' disableRipple>
                        <Link href={"/ticket"}>
                            TICKETS
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseSupport} key='wiki' disableRipple>
                        <Link href={"/"}>
                            WIKI
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseSupport} key='faq' disableRipple>
                        <Link href={"/"}>
                            FAQ
                        </Link>
                    </MenuItem>
                </StyledMenu>
                <StyledMenu
                    id="user-menu"
                    MenuListProps={{
                        'aria-labelledby': 'user-button',
                    }}
                    disablePortal={true}
                    disableScrollLock={true}
                    keepMounted
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={openUser}
                    onClose={handleCloseUser}
                >
                    <MenuItem onClick={handleCloseUser} key='user-profile' disableRipple>
                        <Link href={"/user/" + user.user?.id}>
                            PROFILE
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUser} key='edit-user' disableRipple>
                        <Link href={"/user/" + user.user?.id + "/edit"}>
                            EDIT
                        </Link>
                    </MenuItem>
                </StyledMenu>
                {/** End Menus */}
            </Container>
        </AppBar>
    )
}

export default Navbar;