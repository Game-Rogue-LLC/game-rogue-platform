import { Box, Chip, Tooltip, Typography } from "@mui/material";
import { Event, Grid3x3 } from "@mui/icons-material";

import CustomButton from "@/src/components/button/CustomButton";
import { formatDate } from "@/src/utils/utils";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const ParticipantInfo = ({ item, reverse }) => {
  const { team } = useTournamentContext();
  const { colors } = useStyleContext();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexDirection: reverse === true ? "row" : "row-reverse"
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          flexDirection: "column"
        }}
      >
        <Box component="img" src={team?.teams[item?.id]?.darkLogo} width={150} height={150}></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Grid3x3 fontSize="12px" htmlColor="white" />
          <Typography variant="body2" color="white">
            {item?.id}
          </Typography>
        </Box>
        {/* <Chip
          icon={}
          label={item?.id}
          sx={{ opacity: 0.8, p: 0, height: "20px" }}
        /> */}
      </Box>
      <Box sx={{ flex: 1, mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Tooltip title={item?.residency.label}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${item?.residency.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${item?.residency.code.toLowerCase()}.png 2x`}
              alt=""
            />
          </Tooltip>
          <Typography variant="h4" fontSize={24} color={colors.primary}>
            {item?.name}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1, mt: 1, alignItems: "center", mt: 2 }}>
          <Typography variant="body1" color="white">
            Member Since:
          </Typography>
          <Chip icon={<Event />} label={formatDate(item?.createdAt, "MMM. YYYY")} sx={{ p: 1 }} />
        </Box>
        <CustomButton
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => {
            router.push("/team/" + item?.id);
          }}
        >
          VIEW PROFILE
        </CustomButton>
        {/* <Chip
        icon={
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${item?.residency.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${item?.residency.code.toLowerCase()}.png 2x`}
            alt=""
          />
        }
        label={item?.residency?.label}
        sx={{ p: 1 }}
      /> */}
      </Box>
    </Box>
  );
};

export default ParticipantInfo;
