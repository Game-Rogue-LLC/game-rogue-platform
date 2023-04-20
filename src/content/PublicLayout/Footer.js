import Link from 'next/link';
import {
    Box,
    SvgIcon,
    Typography,
    useTheme
} from '@mui/material';
import {
    Instagram,
    Twitter,
    YouTube,
} from '@mui/icons-material';

const Footer = (props) => {
    const theme = useTheme();
    return (
        <Box component={'footer'}>
            <Box
                component={'section'}
            >
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '50%',
                        mx: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant='h4' sx={{ color: theme.palette.primary.main, fontSize: '25px' }}>
                            HOME
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            ABOUT US
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            TICKETS
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            WIKI
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            FAQS
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            SEARCH
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant='h4' sx={{ color: theme.palette.primary.main, fontSize: '25px' }}>
                            EVENTS
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            FEATURED
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            LIVE NOW
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            ONGOING
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            <Link href={'/event/upcoming'}>
                                UPCOMING
                            </Link>
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            PAST
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant='h4' sx={{ color: theme.palette.primary.main, fontSize: '25px' }}>
                            MY TEAM
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            MY MATCHES
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            MY PROFILE
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            ARTICLES
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant='h4' sx={{ color: theme.palette.primary.main, fontSize: '25px' }}>
                            SHOP
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            ROGUE MERCH
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            TEAM MERCH
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            CUSTOMIZE
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant='h4' sx={{ color: theme.palette.primary.main, fontSize: '25px' }}>
                            ORGANIZER
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            DASHBOARD
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            MARTCH CHATS
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            GO LIVE
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            COMMUNITY
                        </Typography>
                        <Typography variant='h4' sx={{ color: 'white', fontSize: '25px', mt: 3 }}>
                            CREATE
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        width: '50%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mx: 'auto',
                        mt: 5
                    }}
                >
                    <Box>
                        <img src='/static/images/security.png' />
                        <img src='/static/images/lock.png' />
                    </Box>
                    <Box>
                        <img src='/static/images/paypal.png' />
                        <img src='/static/images/card.png' />
                    </Box>
                </Box>
            </Box>
            <Box
                component={'section'}
                sx={{
                    width: '85%',
                    mx: 'auto',
                    mt: 2,
                    borderTop: 'solid 3px white',
                    pt: '40px',
                    pb: '80px'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <img src='/GR_Letters.png' />
                    <Box>
                        <Typography
                            variant='h4'
                            sx={{
                                color: theme.palette.primary.main,
                                fontSize: '20px',
                                textAlign: 'center'
                            }}
                        >
                            Game Rogue, LLC
                            <br />
                            2023 &copy;
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: 1
                        }}
                    >
                        <Link href={'#'}
                            style={{
                                height: '34px',
                                width: '40px',
                                backgroundColor: theme.palette.primary.main,
                                p: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            <img src='/static/images/discord.svg' style={{ height: '30px' }} />
                        </Link>
                        <Link href={'#'}
                            style={{
                                height: '34px',
                                width: '40px',
                                backgroundColor: theme.palette.primary.main,
                                p: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            <YouTube fontSize='large' sx={{ color: 'white' }} />
                        </Link>
                        <Link href={'#'}
                            style={{
                                height: '34px',
                                width: '40px',
                                backgroundColor: theme.palette.primary.main,
                                p: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            <SvgIcon fontSize='large'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="white" d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z" />
                                </svg>
                            </SvgIcon>
                        </Link>
                        <Link href={'#'}
                            style={{
                                height: '34px',
                                width: '40px',
                                backgroundColor: theme.palette.primary.main,
                                p: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            <Twitter fontSize='large' sx={{ color: 'white' }} />
                        </Link>
                        <Link href={'#'}
                            style={{
                                height: '34px',
                                width: '40px',
                                backgroundColor: theme.palette.primary.main,
                                p: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            <Instagram fontSize='large' sx={{ color: 'white' }} />
                        </Link>
                        <Link href={'#'}
                            style={{
                                height: '34px',
                                width: '40px',
                                backgroundColor: theme.palette.primary.main,
                                p: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '4px'
                            }}
                        >
                            <img src='/static/images/tiktok.svg' style={{ height: '30px' }} />
                        </Link>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Footer;