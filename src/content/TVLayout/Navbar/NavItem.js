import { Box, Divider, Typography, useTheme } from "@mui/material";

export default function TVNavItem({ active, name, onClick }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        height: "100%",
        pt: "3px",
        display: "flex",
        alignItems: "center",
        borderBottom: active ? "solid 3px " + theme.palette.primary.main : "none",
        color: active ? theme.palette.primary.main : "white",
        pb: active ? 0 : "3px",
        cursor: "pointer",
        ":hover": {
          color: theme.palette.primary.main,
          pb: 0,
          borderBottom: "solid 3px " + theme.palette.primary.main
        }
      }}
      onClick={onClick}
    >
      <Typography fontSize={20}>{name}</Typography>
    </Box>
  );
}
