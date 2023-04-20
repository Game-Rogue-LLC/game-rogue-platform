import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    Typography,
    useTheme
} from '@mui/material'
import { Edit } from '@mui/icons-material';

const UserInfo = (props) => {
    const theme = useTheme();
    const { item, editable, handle, avatar } = props;
    return (
        <Box>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <Avatar alt={item?.name} src={avatar} sx={{ width: 150, height: 150, mx: 'auto' }} />
                {
                    editable
                        ?
                        <IconButton size='large' sx={{ position: 'absolute', right: 0, bottom: 0, color: theme.palette.primary.main }} component={'label'}>
                            <Edit />
                            <input type="file" accept="image/*" name="upload-image" id="upload-image" hidden onChange={handle} />
                        </IconButton>
                        :
                        <Box sx={{ width: '100%', textAlign: 'center' }}>
                            <Button variant='contained' sx={{ mt: 2, mx: 'auto' }} onClick={handle}>
                                EDIT PROFILE
                            </Button>
                        </Box>
                }
            </Box>
            <Box sx={{ mt: 4 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='b1' sx={{ fontWeight: '900' }}>
                            ACCOUNT ID
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='b1'>
                            {item?._id}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='b1' sx={{ fontWeight: '900' }}>
                            NAME
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='b1'>
                            {item?.name}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='b1' sx={{ fontWeight: '900' }}>
                            USER NAME
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='b1'>
                            {item?.userName}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='b1' sx={{ fontWeight: '900' }}>
                            AGE
                        </Typography>
                    </Grid>
                    <Grid>
                        <Typography variant='b1'>
                            {item?.age}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='b1' sx={{ fontWeight: '900' }}>
                            GENDER
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='b1'>
                            {item?.gender == 0 ? 'Male' : 'Female'}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant='b1' sx={{ fontWeight: '900' }}>
                            RESIDENCY
                        </Typography>
                    </Grid>
                    <Grid item>
                        <img
                            loading="lazy"
                            width="20"
                            src={`https://flagcdn.com/w20/${item?.residency.code.toLowerCase()}.png`}
                            srcSet={`https://flagcdn.com/w40/${item?.residency.code.toLowerCase()}.png 2x`}
                            alt=""
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default UserInfo;