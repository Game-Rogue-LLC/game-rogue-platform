import { useEffect } from 'react'
import FirebaseAuth from '@/pages/components/auth/FirebaseAuth'
import { Container, Box, Card, Typography, TextField, Button } from '@mui/material'
import Link from 'next/link'
import Router from 'next/router'

import { useAuthContext } from '@/src/context/AuthContext';

const Auth = () => {
    const { user, loading } = useAuthContext();
    useEffect(() => {
        if (loading) {
        }
        else {
            if (user) Router.push('/organization/create')
        }
    }, [loading])

    return (
        <Box pt={20} sx={{ backgroundColor: "#363740", width: "100vw", height: "100vh", position: "fixed", top: 0, color: "#fff", textAlign: "center" }}>
            {
                <Container maxWidth="sm">
                    <Card>
                        <Box p={4}>
                            <Box>
                                <Link href="/" passHref>
                                    <img src="/logo.svg" style={{ height: "5rem" }}></img>
                                </Link>
                                <Typography variant="h3" color={"#A4A6B3"} sx={{ mb: 5 }}>DASHBOARDTECHGUYS</Typography>
                                <Typography variant="h2" sx={{ mb: 1 }}>Log In to Admin Portal</Typography>
                                <Typography variant="h5" color={"#9FA2B4"}>Enter your email and password below</Typography>
                            </Box>
                            <Box>
                                <FirebaseAuth />
                            </Box>
                        </Box>
                    </Card>
                </Container>
            }
        </Box>
    )
}

export default Auth
