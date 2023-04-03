import * as React from 'react'
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
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useRouter } from 'next/router'
import { Event, KeyboardArrowDown } from '@mui/icons-material'
import { useEventContext } from '@/context/EventContext'
import { useOrganizationContext } from '@/srccontext/OrganizationContext'

const Menu = (props) => {
    const { organization } = props
    const { events, setCurrent: setCurrentEvent } = useEventContext()
    const { setCurrent: setCurrentOrganization } = useOrganizationContext()
    const [open, setOpen] = React.useState(false)
    const router = useRouter()
    const theme = useTheme()

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
                    key={organization.id}
                    alignItems="flex-start"
                    sx={{
                        px: 3,
                        py: 2.5,
                        alignItems: 'center'
                        // '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
                    }}
                >
                    <ListItemText
                        primary={organization.name}
                        primaryTypographyProps={{
                            fontSize: 15,
                            fontWeight: 'medium',
                            lineHeight: '20px',
                            mb: '2px',
                        }}
                        secondary={!open && organization.tagline}
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
                        {Object.keys(events).filter((key, i) => organization.id == events[key].oid).map((id, idx) => (
                            <ListItemButton
                                key={"event_menu_" + organization.id + "_" + idx}
                                sx={{ minHeight: 32, color: 'rgba(255,255,255,.8)' }}
                                onClick={() => {
                                    setCurrentOrganization(organization.id)
                                    setCurrentEvent(id)
                                    router.push('/event/' + id + '/match')
                                }}
                            >
                                <ListItemIcon sx={{ color: 'inherit' }}>
                                    <Event />
                                </ListItemIcon>
                                <ListItemText
                                    primary={events[id].label}
                                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                                />
                            </ListItemButton>
                        ))}
                        <Box sx={{
                            display: 'flex'
                        }}>
                            <Button
                                variant='outlined'
                                onClick={() => router.push('/profile?organization=' + organization.id)}
                                sx={{
                                    flexGrow: 1,
                                    m: 1
                                }}
                                size='small'
                            >
                                Organizer Profile
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => router.push('/event/create?organization=' + organization.id)}
                                sx={{
                                    flexGrow: 0,
                                    my: 1,
                                    mr: 1,
                                    color: 'white',
                                    border: '1px solid rgba(255, 255, 255, .5)',
                                    display: organization.events?.length >= 5 ? 'none' : 'block'
                                }}
                                color='secondary'
                                size='small'
                            > + </Button>
                        </Box>
                    </>}
            </Box>
            <Divider />
        </>
    )
}

export default Menu
