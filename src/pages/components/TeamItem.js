import {
    Box
} from '@mui/material'

export default function (props) {
    const { team, sx, win } = props;
    let color = 'white'
    if (win == 2) color = '#00c106'
    else if (win == 1) color = '#c15900'
    else if (win == 0) color = 'gray'
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', ...sx, color }}>
            {team?.icon}&nbsp;Team {team?.id + 1}
        </Box>
    )
}