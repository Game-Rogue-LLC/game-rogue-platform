import { Edit } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    InputLabel,
    OutlinedInput,
    Paper,
    Typography
} from "@mui/material";

const ContentBlock = (props) => {
    return (
        <Paper sx={{ p: 4, mt: 4 }}>
            <Typography variant='h6'>Content Block</Typography>
            <Box sx={{ textAlign: 'center', position: 'relative' }}>
                <IconButton sx={{ position: 'absolute', right: 0, bottom: 0 }} color='primary'>
                    <Edit />
                </IconButton>
                <img src='/Game_Rogue_Text_2_copy.png' style={{ width: '600px' }} />
            </Box>
            <Box>
                <InputLabel htmlFor="content-url" sx={{ mt: 2 }}>URL</InputLabel>
                <OutlinedInput id="content-url" name="url" value='https://gamerogue.com' aria-describedby="content-url-helper" sx={{ mt: 1 }} fullWidth />
            </Box>
            <Box>
                <InputLabel htmlFor="content-title" sx={{ mt: 2 }}>Title</InputLabel>
                <OutlinedInput id="content-title" name="title" value='Game Rogue' aria-describedby="content-title-helper" sx={{ mt: 1 }} fullWidth />
            </Box>
            <Box>
                <InputLabel htmlFor="content-text" sx={{ mt: 2 }}>Text</InputLabel>
                <OutlinedInput id="content-text" name="text" value='This is the organization of the game rogue.' aria-describedby="content-text-helper" sx={{ mt: 1 }} inputProps={{ maxLength: 50 }} fullWidth />
            </Box>
            <Button variant='contained' sx={{ mt: 2 }}>
                Save
            </Button>
        </Paper>
    )
}

export default ContentBlock;