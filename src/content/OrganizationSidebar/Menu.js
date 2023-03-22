import * as React from 'react';

import {
	Box,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	useTheme,
	Divider,
} from "@mui/material"

import { alpha } from '@mui/material/styles';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Router from 'next/router';

const Menu = (props) => {
	const { organization } = props
	const [open, setOpen] = React.useState(false);
	const theme = useTheme();
	return (
		<Box
			sx={{
				bgcolor: open ? alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				) : null,
				pb: 0,
			}}
		>
			<ListItemButton
				alignItems="flex-start"
				onClick={() => {
					setOpen(!open);
				}}
				sx={{
					px: 3,
					pt: 2.5,
					pb: open ? 0 : 2.5,
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
					secondary={organization.description}
					secondaryTypographyProps={{
						noWrap: true,
						fontSize: 12,
						lineHeight: '16px',
						color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
					}}
					sx={{ my: 0 }}
				/>
				<KeyboardArrowDown
					sx={{
						mr: -1,
						// opacity: 0,
						transform: open ? 'rotate(-180deg)' : 'rotate(0)',
						transition: '0.2s',
					}}
				/>
			</ListItemButton>
			{open &&
			<>
				{organization.events?.map((item, idx) => (
					<ListItemButton
						key={"event_menu_" + organization._id + "_" + idx}
						sx={{ minHeight: 32, color: 'rgba(255,255,255,.8)' }}
					>
						<ListItemIcon sx={{ color: 'inherit' }}>
							{item.icon}
						</ListItemIcon>
						<ListItemText
							primary={item.label}
							primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
						/>
					</ListItemButton>
				))}
				<ListItemButton onClick={() => Router.push('/event/create?organization='+organization._id)}>
					<ListItemText primary='+' sx={{ textAlign: 'center' }} />
				</ListItemButton>
			</>}
		</Box>
	)
}

export default Menu
