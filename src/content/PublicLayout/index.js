import {
    Box
} from '@mui/material'

import Navbar from '@/src/content/PublicLayout/Navbar';
import Footer from '@/src/content/PublicLayout/Footer';

const PublicLayout = (props) => {
    return (
        <Box sx={{ background: 'black' }}>
            <Navbar />

            <Box sx={{ background: 'black' }}>
                {props.children}
            </Box>

            <Footer />
        </Box>
    )
}

export default PublicLayout;