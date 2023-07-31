import { Box, Button, Grid, SvgIcon, Typography } from "@mui/material";
import {
  DEFAULT_CONTENTBLOCK_IMAGE,
  DEFAULT_DARK_LOGO,
  DEFAULT_LIGHT_LOGO
} from "@/src/config/global";
import { buttonStyle, formatDate, formatNumber, withOpacity } from "@/src/utils/utils";
import { useEffect, useMemo } from "react";

import GameChip from "@/src/components/chip/GameChip";
import Link from "next/link";
import PlatformChip from "@/src/components/chip/PlatformChip";
import RegionChip from "@/src/components/chip/RegionChip";
import dayjs from "dayjs";
import numeral from "numeral";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const EventCard = ({ item }) => {
  const { currentTime, setCurrentTime, organization } = useTournamentContext();

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  const isUpcoming = useMemo(() => {
    if (dayjs(item.startAt).isAfter(currentTime)) return true;
    return false;
  }, [item?.startAt]);

  return (
    <Link href={`/event/${item?.id}`}>
      <Box
        sx={{
          border: "solid 1px " + item?.primary,
          // minHeight: "280px",
          background: "black",
          overflow: "hidden",
          ":hover": {
            cursor: "pointer",
            background: withOpacity(item?.primary, 0.1)
          }
        }}
      >
        <Box
          sx={{
            height: "70px",
            background: "url(" + (item?.banner || DEFAULT_CONTENTBLOCK_IMAGE) + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: "solid 1px gray",
            p: 1,
            alignItems: "center",
            display: "flex",
            gap: 1
          }}
        ></Box>
        <Box sx={{ p: 2 }}>
          <Grid container spacing={1}>
            <Grid item xs sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  overflow: "hidden"
                }}
              >
                <img
                  src={item?.darkLogo || DEFAULT_DARK_LOGO}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    variant="h4"
                    fontSize={24}
                    color={item?.primary}
                    sx={{ whiteSpace: "nowrap", textOverflow: "hidden" }}
                  >
                    {item?.name}
                  </Typography>
                </Box>
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
                <PlatformChip type={item?.platform} />
                <RegionChip type={item?.region} />
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                width: "80px"
              }}
            >
              <Box
                sx={{
                  borderRadius: "10px",
                  backgroundColor: withOpacity(item?.primary, 0.2),
                  border: "solid 2px rgba(255,255,255,0.3)"
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ borderBottom: "solid 1px rgba(255,255,255,0.2)" }}
                  textAlign="center"
                >
                  {formatDate(item?.startAt, "MMM")}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="h4">{formatDate(item?.startAt, "DD")}</Typography>
                </Box>
              </Box>
            </Grid>
            {/* <Chip
            label={getStatus(item?.start, currentTime)}
            sx={{
              backgroundColor: "#393D40",
              color: "white",
              textTransform: "uppercase",
              mt: 1,
            }}
          /> */}
          </Grid>
        </Box>
        <Box sx={{ p: 2, background: "transparent" }}>
          <Grid container color="lightgray">
            <Grid item sx={{ width: "100px" }}>
              <Typography variant="body1">Date:</Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body2">
                {formatDate(item?.startAt, "DD. MMM. YYYY")}
                {" - "}
                {formatDate(item?.endAt, "DD. MMM. YYYY")}
              </Typography>
            </Grid>
          </Grid>
          <Grid container color="lightgray" sx={{ mt: 2, alignItems: "center" }}>
            <Grid item xs>
              {isUpcoming ? (
                <Button variant="contained" sx={{ ...buttonStyle(item?.primary) }}>
                  ${formatNumber(item?.entryFee, 2)}
                </Button>
              ) : (
                <>
                  <Button variant="contained" sx={{ ...buttonStyle(item?.primary) }}>
                    View now
                  </Button>
                  {/* <Button
                    variant="contained"
                    sx={{ backgroundColor: "#9146ff", color: "white", ml: 2 }}
                    disabled={!organization?.organizations[item?.oid]?.twitch}
                  >
                    <SvgIcon fontSize="medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                        />
                      </svg>
                    </SvgIcon>{" "}
                    &nbsp; LIVE NOW
                  </Button> */}
                </>
              )}
            </Grid>
            <Grid item xs>
              <Typography variant="body1" textAlign="center">
                Teams
              </Typography>
              <Typography variant="h6" textAlign="center">
                {_.size(item?.participants)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography variant="body1" textAlign="center">
                Prize Pool
              </Typography>
              <Typography variant="h6" textAlign="center">
                ${numeral(item?.prize).format("0,0")}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link>
  );
};

export default EventCard;
