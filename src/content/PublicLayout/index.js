import {
  Box
} from '@mui/material'

import Navbar from '@/src/content/PublicLayout/Navbar';
import Footer from '@/src/content/PublicLayout/Footer';

const PublicLayout = (props) => {
  return (
    <Box sx={{ background: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar sx={{ position: 'fixed' }} />

      <Box sx={{ background: 'black', flex: 1, marginTop: '73px' }}>
        {props.children}
      </Box>

      <Footer />
    </Box>
  )
}

export default PublicLayout;