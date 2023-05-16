import { Box, Grid, styled, useTheme, Typography } from "@mui/material";
import Image from "next/image";

// const Wrapper = styled("div")(({ theme }) => ({
//   [theme.breakpoints.down("md")]: {
//     width: "33.33333%",
//   },
//   [theme.breakpoints.up("md")]: {
//     width: "25%",
//   },
//   [theme.breakpoints.up("lg")]: {
//     width: "20%",
//   },
// }));

export default function MemberItem({ item }) {
  const theme = useTheme();
  return (
    <Grid
      item
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "calc(100% / 5)",
      }}
    >
      <Box
        sx={{
          width: "170px",
          height: "170px",
          backgroundColor: theme.palette.primary.main,
          border: "solid 2px white",
          borderRadius: "20px",
        }}
      >
        <Image alt="" src="" />
      </Box>
      <Typography
        variant="h4"
        color={theme.palette.primary.main}
        fontSize={26}
        textAlign="center"
        sx={{ mt: 2 }}
      >
        {item?.nickName}
      </Typography>
      <Typography variant="h4" fontSize={22} textAlign="center">
        {item?.name}
      </Typography>
      <Typography
        variant="h4"
        color="rgb(204, 202, 202)"
        fontSize={20}
        textAlign="center"
      >
        {item?.position}
      </Typography>
    </Grid>
  );
}
