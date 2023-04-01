import { useEffect } from 'react'
import FirebaseAuth from '@/pages/components/auth/FirebaseAuth'
import { Container, Box, Card, Typography, TextField, Button } from '@mui/material'
import { useRouter } from 'next/router'

import { useAuthContext } from '@/src/context/AuthContext';

const Auth = () => {
    const { user, loading } = useAuthContext();
    const router = useRouter();
    useEffect(() => {
        if (loading) {
        }
        else {
            if (user) router.push('/organization/create')
        }
    }, [loading])

    return (
        <Box pt={20} sx={{ backgroundColor: "#363740", width: "100vw", height: "100vh", position: "fixed", top: 0, color: "#fff", textAlign: "center" }}>
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
