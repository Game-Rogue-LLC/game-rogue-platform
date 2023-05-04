import { useEffect } from 'react'
import FirebaseAuth from '@/src/components/auth/FirebaseAuth'
import { Container, Box, Card, Typography, TextField, Button } from '@mui/material'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/src/context/AuthContext';

const Auth = () => {
    const user = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (user.loading == false && user.user) {
            router.push('/');
        }
    }, [user])

    return (
        <Box pt={20} sx={{
            "backgroundImage": "linear-gradient(to top,#28160c,rgb(var(--background-end-rgb)))",
            width: "100vw", height: "100vh", position: "fixed", top: 0, color: "#fff", textAlign: "center"
        }}>
            <Container maxWidth="sm">
                <Card>
                    <Box p={4}>
                        <Box>
                            <Typography variant="h2" sx={{ mb: 1 }}>Log In</Typography>
                        </Box>
                        <Box>
                            <FirebaseAuth />
                        </Box>
                    </Box>
                </Card>
            </Container>
        </Box>
    )
}

export default Auth
