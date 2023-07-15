import { Box, Chip, Grid, Typography } from "@mui/material";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_DARK_LOGO } from "@/src/config/global";

import GameChip from "@/src/components/chip/GameChip";
import Link from "next/link";
import PlatformChip from "@/src/components/chip/PlatformChip";
import RegionChip from "@/src/components/chip/RegionChip";
import TeamItem from "@/src/components/item/TeamItem";
import dayjs from "dayjs";
import { formatDate } from "@/src/utils/utils";
import { useMemo } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const StreamCard = ({ item }) => {
  const { event, team, currentTime } = useTournamentContext();

  return (
    <Link href={item?.url}>
      <Box
        sx={{
          border: "solid 1px rgba(255, 255, 255, 0.2)",
          minHeight: "280px",
          background: "black",
          ":hover": {
            cursor: "pointer",
            background: "rgba(245, 131, 31, 0.1)"
          }
        }}
      >
        <Box
          sx={{
            height: "70px",
            background:
              "url(" + (event?.events[item?.eid]?.banner || DEFAULT_CONTENTBLOCK_IMAGE) + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: "solid 1px gray",
            p: 1,
            alignItems: "center",
            display: "flex",
            gap: 1
          }}
        ></Box>
        <Box
          sx={{
            p: 2,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1
          }}
        >
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img
                src={event?.events[item?.eid]?.darkLogo || DEFAULT_DARK_LOGO}
                width={40}
                height={40}
                style={{ objectFit: "cover" }}
              />
              <Typography
                variant="h4"
                fontSize={24}
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
              >
                {event?.events[item?.eid]?.name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 1,
                gap: 1,
                flexWrap: true
              }}
            >
              <GameChip />
              <PlatformChip type={event?.events[item?.eid]?.platform} />
              <RegionChip type={event?.events[item?.eid]?.region} />
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              maxWidth: "80px",
              borderRadius: "10px",
              backgroundColor: "#1c0a00",
              border: "solid 2px rgba(255,255,255,0.3)"
            }}
          >
            <Typography
              variant="h6"
              sx={{ borderBottom: "solid 1px rgba(255,255,255,0.2)" }}
              textAlign="center"
            >
              {formatDate(item?.start, "MMM")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="h4">{formatDate(item?.start, "DD")}</Typography>
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 2, background: "transparent" }}>
          <Grid container sx={{ border: "solid 1px #c35600" }}>
            <Grid
              item
              sx={{
                width: "40px",
                backgroundColor: "#c35600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Typography variant="h6">VS</Typography>
            </Grid>
            <Grid item xs>
              <TeamItem
                team={team?.teams[item?.participants[0].id]}
                sx={{
                  pl: 1,
                  py: 0.5,
                  justifyContent: "left",
                  borderBottom: "solid 1px #c35600b5"
                }}
                disableLink
              />
              <TeamItem
                team={team?.teams[item?.participants[1].id]}
                sx={{ pl: 1, py: 0.5, justifyContent: "left" }}
                disableLink
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link>
  );
};

export default StreamCard;
