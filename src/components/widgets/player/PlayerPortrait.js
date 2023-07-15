import { Box, Button, Grid, Typography } from "@mui/material";
import { formatDate, getTeamPosition } from "@/src/utils/utils";

import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const PlayerPortrait = ({ item, sx }) => {
  const router = useRouter();
  const { primaryBackgroundColor } = useStyleContext();

  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", p: 2, ...sx }}>
      <Grid container spacing={2} rowSpacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="h6" color="white" fontSize={20}>
            {item?.userName}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" color="white" fontSize={20}>
            {getTeamPosition(1)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" color="white" fontSize={18}>
            JOINED {formatDate(item?.joinedAt, "DD MMMM YYYY")}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant="contained"
            onClick={() => {
              router.push("/rogue-social/profile/" + item?.id);
            }}
          >
            VIEW PROFILE
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlayerPortrait;
