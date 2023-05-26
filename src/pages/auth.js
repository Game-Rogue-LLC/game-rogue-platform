import { useEffect, useState } from "react";
import FirebaseAuth from "@/src/components/auth/FirebaseAuth";
import {
  Container,
  Box,
  Card,
  Typography,
  TextField,
  Button,
  OutlinedInput,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel
} from "@mui/material";
import { useRouter } from "next/router";

import { useAuthContext } from "@/src/context/AuthContext";
import { Home, PersonAddAlt } from "@mui/icons-material";

const Auth = () => {
  const user = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSignup, setOpenSignup] = useState(false);

  useEffect(() => {
    if (user.loading == false && user.user) {
      router.push("/");
    }
  }, [user]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOpenSignup = (e) => {
    setOpenSignup(true);
  };
  const handleCloseSignup = (e) => {
    setOpenSignup(false);
    setEmail("");
    setPassword("");
  };

  const handleSignupBtnClick = (e) => {
    user.signUp({ email, password });
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: "/static/images/event-banner.png",
          position: "fixed",
          zIndex: -2,
          top: 0,
          left: 0
        }}>
        <video autoPlay loop muted poster="/static/images/event_banner.png">
          <source src="/static/images/event_banner.mp4" type="video/mp4" />
        </video>
      </Box>
      <Box
        sx={{
          background: "rgba(93,65,20,0.5)",
          position: "fixed",
          zIndex: -1,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backdropFilter: "blur(6px)"
        }}></Box>
      <Box
        pt={20}
        sx={{
          // "backgroundImage": "linear-gradient(to top,#28160c,rgb(var(--background-end-rgb)))",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          color: "#fff",
          textAlign: "center"
        }}>
        <Button
          variant="text"
          sx={{
            position: "fixed",
            alignItems: "center",
            left: "20px",
            top: "20px",
            color: "white"
          }}
          onClick={() => {
            router.push("/");
          }}>
          <Home />
          &nbsp;
          <Typography variant="body1">Home</Typography>
        </Button>
        <Container maxWidth="sm">
          <Card
            sx={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(3px)",
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)"
            }}>
            <Box maxWidth="sm">
              <Box className="gr-login-banner" sx={{ py: 4 }}>
                <img src="/GR_Letters.png" style={{ filter: "brightness(0)" }} />
              </Box>
              <Box sx={{ mt: 4, px: 4 }}></Box>
              <Box sx={{ mt: 2, p: 4 }}>
                <Grid container>
                  <Grid item xs={12} sx={{ px: "24px" }}>
                    <Button
                      variant="contained"
                      className="btn-signup"
                      startIcon={<PersonAddAlt fontSize="small" />}
                      onClick={async (e) => {
                        // let res = await verifyEmail({
                        //   emailAddress: email,
                        //   verifyMx: true,
                        //   verifySmtp: true,
                        //   timeout: 3000
                        // })
                        // if (!(res.validFormat && res.validSmtp && res.validMx)) {
                        //   alert('Email is not valid.');
                        //   return;
                        // }
                        handleOpenSignup(e);
                      }}
                      sx={{
                        maxWidth: "360px"
                      }}>
                      Sign up with email
                    </Button>
                  </Grid>
                </Grid>
                <FirebaseAuth />
              </Box>
            </Box>
          </Card>
        </Container>
        {/* Modal for Sign up */}
        <Dialog
          open={openSignup}
          onClose={handleCloseSignup}
          PaperProps={{
            style: {
              padding: "20px"
            }
          }}>
          <DialogTitle
            variant="h2"
            fontSize={"3rem"}
            textAlign={"center"}
            textTransform={"uppercase"}>
            Sign up
          </DialogTitle>
          <DialogContent>
            <Box sx={{ width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>Email</InputLabel>
                  <OutlinedInput
                    name="email"
                    placeholder="Enter your Email"
                    size="small"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{
                      mt: 1
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    name="password"
                    placeholder="Enter your Password"
                    size="small"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    sx={{
                      mt: 1
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              startIcon={<PersonAddAlt fontSize="small" />}
              onClick={handleSignupBtnClick}>
              Sign Up
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Auth;

//   < Grid container spacing = { 2} >
// <Grid item xs={12}>
//   <OutlinedInput
//     name="email"
//     placeholder='Enter your Email'
//     size='small'
//     value={email}
//     onChange={handleEmailChange}
//     sx={{ width: '220px' }}
//   />
// </Grid>
// <Grid item xs={12}>
//   <OutlinedInput
//     name="password"
//     placeholder='Enter your Password'
//     size='small'
//     type='password'
//     value={password}
//     onChange={handlePasswordChange}
//     sx={{ width: '220px' }}
//   />
// </Grid>
// </ >
