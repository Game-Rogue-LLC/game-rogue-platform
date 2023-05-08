import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    useTheme,
    Divider,
    IconButton,
    Tooltip,
} from '@mui/material'
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Event, KeyboardArrowDown } from '@mui/icons-material';
import { useTournamentContext } from '@/src/context/TournamentContext';

const Menu = (props) => {
    const { organization: item } = props;
    const { organization, event } = useTournamentContext();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const theme = useTheme();

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <>
            <Box
                sx={{
                    bgcolor: open ? alpha(
                        theme.palette.primary.main,
                        theme.palette.action.selectedOpacity,
                    ) : null,
                    pb: 0,
                }}
            >
                <ListItem
                    key={item.id}
                    alignItems="flex-start"
                    sx={{
                        px: 3,
                        py: 2.5,
                        alignItems: 'center'
                        // '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                    }}
                >
                    <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 'medium',
                            lineHeight: '20px',
                            mb: '2px',
                        }}
                        secondary={!open && item.tagline}
                        secondaryTypographyProps={{
                            noWrap: true,
                            fontSize: 12,
                            lineHeight: '16px',
                            // color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
                        }}
                        sx={{ my: 0 }}
                    />
                    <IconButton
                        onClick={handleOpen}
                    >
                        <KeyboardArrowDown
                            sx={{
                                // opacity: 0,
                                transform: open ? 'rotate(-180deg)' : 'rotate(0)',
                                transition: '0.2s',
                            }}
                        />
                    </IconButton>
                </ListItem>
                {open &&
                    <>
                        {Object.keys(event.events).filter((key, i) => item.id == event.events[key].oid).map((id, idx) => (
                            <ListItemButton
                                key={"event_menu_" + item.id + "_" + idx}
                                sx={{ minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                onClick={() => {
                                    organization.setCurrent(item.id);
                                    event.setCurrent(id);
                                    router.push('/match?event=' + id);
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    <Event />
                                </ListItemIcon>
                                <ListItemText
                                    primary={event.events[id].name}
                                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                />
                            </ListItemButton>
                        ))}
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <Button
                                variant='outlined'
                                onClick={() => router.push('/profile?organization=' + item.id)}
                                sx={{
                                    flexGrow: 1,
                                    m: 1
                                }}
                                size='small'
                            >
                                Edit Organization
                            </Button>
                            <Tooltip title="Create Event">
                                <Button
                                    variant='contained'
                                    onClick={() => router.push('/event/create?organization=' + item.id)}
                                    sx={{
                                        flexGrow: 0,
                                        my: 1,
                                        mr: 1,
                                        color: 'white',
                                        border: '1px solid rgba(255, 255, 255, .5)',
                                        display: event.activeCount[item.id] >= 5 ? 'none' : 'block'
                                    }}
                                    color='secondary'
                                    size='small'
                                > + </Button>
                            </Tooltip>
                        </Box>
                    </>}
            </Box>
            <Divider />
        </>
    )
}

export default Menu
