import { Box, SvgIcon, Typography, useTheme } from "@mui/material";
import { Instagram, Twitter, YouTube } from "@mui/icons-material";

import Link from "next/link";

const Footer = (props) => {
  const theme = useTheme();
  return (
    <Box component={"footer"} sx={{ backgroundColor: "black" }}>
      <Box
        component={"section"}
        sx={{
          borderTop: "solid 3px #f5831f",
          paddingTop: 5
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            maxWidth: "75%",
            mx: "auto"
          }}
        >
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontSize: "25px", userSelect: "none" }}
              >
                HOME
              </Typography>
            </Link>
            <Link href="/about">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                <Link href="/about">ABOUT US</Link>
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                TICKETS
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                WIKI
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                FAQS
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                SEARCH
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <Link href="/event">
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontSize: "25px", userSelect: "none" }}
              >
                EVENTS
              </Typography>
            </Link>
            <Typography
              variant="h4"
              sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
            >
              FEATURED
            </Typography>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                LIVE NOW
              </Typography>
            </Link>
            <Link href="/event/ongoing">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                ONGOING
              </Typography>
            </Link>
            <Link href="/event/upcoming">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                UPCOMING
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                PAST
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <Link href="/shop">
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontSize: "25px", userSelect: "none" }}
              >
                SHOP
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                ROGUE MERCH
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                TEAM MERCH
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                CUSTOMIZE
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <Link href="/team">
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontSize: "25px", userSelect: "none" }}
              >
                MY TEAM
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                MY MATCHES
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                MY PROFILE
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                ARTICLES
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              textAlign: "center"
            }}
          >
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: theme.palette.primary.main, fontSize: "25px", userSelect: "none" }}
              >
                ORGANIZER
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                DASHBOARD
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                MATCH CHATS
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                GO LIVE
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                COMMUNITY
              </Typography>
            </Link>
            <Link href="/">
              <Typography
                variant="h4"
                sx={{ color: "white", fontSize: "25px", mt: 3, userSelect: "none" }}
              >
                CREATE
              </Typography>
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            width: "85%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "auto",
            mt: 5
          }}
        >
          <Box>
            <img src="/static/images/security.png" />
            <img src="/static/images/lock.png" />
          </Box>
          <Box>
            <img src="/static/images/paypal.png" />
            <img src="/static/images/card.png" />
          </Box>
        </Box>
      </Box>
      <Box
        component={"section"}
        sx={{
          width: "85%",
          mx: "auto",
          mt: 2,
          borderTop: "solid 3px white",
          pt: "40px",
          pb: "20px"
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
          }}
        >
          <img src="/GR_Letters.png" />
          <Box>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.primary.main,
                fontSize: "20px",
                textAlign: "center"
              }}
            >
              Game Rogue, LLC
              <br />
              2023 &copy;
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100px",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              gap: 1
            }}
          >
            <Link
              href={"#"}
              style={{
                height: "34px",
                width: "40px",
                backgroundColor: theme.palette.primary.main,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px"
              }}
            >
              <img src="/static/images/discord.svg" style={{ height: "30px" }} />
            </Link>
            <Link
              href={"#"}
              style={{
                height: "34px",
                width: "40px",
                backgroundColor: theme.palette.primary.main,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px"
              }}
            >
              <YouTube fontSize="large" sx={{ color: "white" }} />
            </Link>
            <Link
              href={"#"}
              style={{
                height: "34px",
                width: "40px",
                backgroundColor: theme.palette.primary.main,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px"
              }}
            >
              <SvgIcon fontSize="large">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="white"
                    d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                  />
                </svg>
              </SvgIcon>
            </Link>
            <Link
              href={"#"}
              style={{
                height: "34px",
                width: "40px",
                backgroundColor: theme.palette.primary.main,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px"
              }}
            >
              <Twitter fontSize="large" sx={{ color: "white" }} />
            </Link>
            <Link
              href={"#"}
              style={{
                height: "34px",
                width: "40px",
                backgroundColor: theme.palette.primary.main,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px"
              }}
            >
              <Instagram fontSize="large" sx={{ color: "white" }} />
            </Link>
            <Link
              href={"#"}
              style={{
                height: "34px",
                width: "40px",
                backgroundColor: theme.palette.primary.main,
                p: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "4px"
              }}
            >
              <img src="/static/images/tiktok.svg" style={{ height: "30px" }} />
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            textAlign: "center",
            width: "100%"
          }}
        >
          <Typography variant="subtitle1" textTransform="uppercase" fontSize={20}>
            Open Beta 1.0
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
