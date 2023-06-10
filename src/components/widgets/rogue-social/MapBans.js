import { Box, Button, Checkbox, Menu, MenuItem, Tooltip, Typography, styled } from "@mui/material";
import { Check, CheckBoxOutlineBlank, Close, ExpandMore } from "@mui/icons-material";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import { DEFAULT_LOGO } from "@/src/config/global";
import { LoadingButton } from "@mui/lab";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const maps = [
  {
    title: "Bank",
    image: "/static/images/maps/Bank.png"
  },
  {
    title: "Border",
    image: "/static/images/maps/Border.png"
  },
  {
    title: "Chalet",
    image: "/static/images/maps/Chalet.png"
  },
  {
    title: "Club House",
    image: "/static/images/maps/Clubhouse.png"
  },
  {
    title: "Cafe",
    image: "/static/images/maps/Kafe.png"
  },
  {
    title: "Oregon",
    image: "/static/images/maps/Oregon.png"
  },
  {
    title: "Sky Scraper",
    image: "/static/images/maps/Skyscraper.png"
  },
  {
    title: "Theme Park",
    image: "/static/images/maps/Theme_park.png"
  },
  {
    title: "Villa",
    image: "/static/images/maps/Villa.png"
  }
];

const ThreeStateCheckbox = () => {
  const [status, setStatus] = useState(0);
  const onCheck = (e) => {
    setStatus((val) => (val + 1) % 3);
  };
  return (
    <Checkbox
      checked={status === 1}
      icon={<Close />}
      indeterminate={status === 0}
      indeterminateIcon={<CheckBoxOutlineBlank />}
      checkedIcon={<Check />}
      onChange={onCheck}
    />
  );
};

const MapMenu = styled(Menu)(({ theme }) => ({
  ".MuiMenu-list": {
    padding: "0px !important"
  },
  ".MuiMenuItem-root": {
    paddingInline: "0px !important",
    paddingBlock: "2px !important"
  }
}));

const MapBans = ({ item }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useAuthContext();
  const { team, match } = useTournamentContext();
  const { enqueueSnackbar } = useSnackbar();
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [banned1, setBanned1] = useState(_.fill(Array(maps.length), 0));
  const [banned2, setBanned2] = useState(_.fill(Array(maps.length), 0));
  const [saving, setSaving] = useState(false);

  const isMyTeam = (team) => {
    return team?.uid === user?.id;
  };

  const isMapBanned = (i) => {
    return (isMyTeam(team1) && banned1[i] === 1) || (isMyTeam(team2) && banned2[i] === 1);
  };

  const isAccepted = () => {
    return (
      (isMyTeam(team1) && item?.accepted && item.accepted[0] === true) ||
      (isMyTeam(team2) && item?.accepted && item.accepted[1] === true)
    );
  };

  const onMapBan = (e, ind) => {
    if (isMyTeam(team1))
      setBanned1((val) => val.map((ban, i) => (i === ind ? (ban + 1) % 3 : ban)));
    else if (isMyTeam(team2))
      setBanned2((val) => val.map((ban, i) => (i === ind ? (ban + 1) % 3 : ban)));
  };

  const getCommonMaps = () => {
    return maps.filter((val, i) => banned1[i] === 2 && banned2[i] === 2);
  };

  const onSave = async (e) => {
    setSaving(true);
    if (isMyTeam(team1)) {
      const res = await match.update(item.id, { mapbans: { 0: banned1 } });
      if (res.code === "succeed") {
        alert("Saved successfully!");
      } else {
        console.warn(res.message);
      }
    } else if (isMyTeam(team2)) {
      const res = await match.update(item.id, { mapbans: { 1: banned2 } });
      if (res.code === "succeed") {
        alert("Saved successfully!");
      } else {
        console.warn(res.message);
      }
    }
    setSaving(false);
  };

  const startMatch = () => {
    let countDown = 5;
    const interval = setInterval(() => {
      enqueueSnackbar(`Game starts in ${countDown} seconds.`, { variant: "info" });
      countDown--;
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
    }, [5000]);
  };

  const onAccept = async (e) => {
    if (confirm("Are you ready for the game?") == false) return;
    if (isMyTeam(team1)) {
      await match.update(item.id, { mapbans: { 0: banned1 } });
      if (item?.accepted && item.accepted[1] === true) {
        startMatch();
        await match.update(item.id, {
          maps: getCommonMaps()
        });
      }
      await match.update(item.id, {
        accepted: [true, item?.accepted ? item.accepted[1] || false : false]
      });
    } else if (isMyTeam(team2)) {
      await match.update(item.id, { mapbans: { 1: banned2 } });
      if (item?.accepted && item.accepted[0] === true) {
        startMatch();
        await match.update(item.id, {
          maps: getCommonMaps()
        });
      }
      await match.update(item.id, {
        accepted: [item?.accepted ? item.accepted[0] || false : false, true]
      });
    }
  };

  const onDecline = async (e) => {
    if (isMyTeam(team1)) {
      await match.update(item.id, {
        accepted: [false, item?.accepted ? item.accepted[1] || false : false]
      });
    }
    if (isMyTeam(team2)) {
      await match.update(item.id, {
        accepted: [item?.accepted ? item.accepted[0] || false : false, false]
      });
    }
  };

  useEffect(() => {
    if (item?.mapbans) {
      if (item.mapbans[0]) {
        setBanned1(item.mapbans[0]);
      }
      if (item.mapbans[1]) {
        setBanned2(item.mapbans[1]);
      }
    }
  }, [item]);

  useEffect(() => {
    if (item?.participants[0]?.id) setTeam1(team?.teams[item.participants[0].id]);
    if (item?.participants[1]?.id) setTeam2(team?.teams[item.participants[1].id]);
  }, [team?.teams, item]);

  const onOpen = (e) => {
    if (anchorEl !== e.currentTarget) setAnchorEl(e.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box>
        <Box textAlign={"center"}>
          <Box
            component={"img"}
            sx={{
              mt: 2,
              height: "150px",
              width: "150px",
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))"
            }}
            src={team1?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography variant="body1" textAlign={"center"} fontSize={"1.5rem"} color={"white"}>
            {team1?.name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexDirection: "column",
          zIndex: 500
        }}
      >
        <Box>
          <CustomButton
            id="map-bans-btn"
            variant="contained"
            aria-controls={open ? "map-bans-menu" : undefined}
            aria-haspopup="true"
            onClick={onOpen}
            sx={{ width: "300px" }}
          >
            Map Bans
          </CustomButton>
          <MapMenu
            id="map-bans-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            // disablePortal={true}
            disableScrollLock={true}
            open={open}
            MenuListProps={{ "aria-labelledby": "map-bans-btn" }}
            onClose={onClose}
          >
            {maps.map((img, i) => (
              <MenuItem key={`map_${i}`} onClick={(e) => onMapBan(e, i)}>
                <Box
                  sx={{
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* <ThreeStateCheckbox /> */}
                  {banned1[i] === 1 ? <Close /> : banned1[i] === 2 ? <Check /> : <></>}
                </Box>

                <Tooltip title={img.title}>
                  <Box
                    sx={{
                      width: "200px",
                      height: "50px",
                      backgroundImage: "url(" + img.image + ")",
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  >
                    {isMapBanned(i) && (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,0.65)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{ color: "black", fontWeight: "bold" }}
                          textTransform="uppercase"
                        >
                          Banned
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Tooltip>

                <Box
                  sx={{
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  {/* <ThreeStateCheckbox /> */}
                  {banned2[i] === 1 ? <Close /> : banned2[i] === 2 ? <Check /> : <></>}
                </Box>
              </MenuItem>
            ))}
            <Box sx={{ py: 1, display: "flex", alignItems: "center" }}>
              <Box
                width={50}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {item?.accepted && item.accepted[0] === true ? <Check /> : <></>}
              </Box>
              {isAccepted() === true ? (
                <Button variant="contained" sx={{ flexGrow: 1 }} onClick={onDecline} color="error">
                  Decline
                </Button>
              ) : (
                <Button variant="contained" sx={{ flexGrow: 1 }} onClick={onAccept} color="success">
                  Accept
                </Button>
              )}
              <Box
                width={50}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {item?.accepted && item.accepted[1] === true ? <Check /> : <></>}
              </Box>
            </Box>
          </MapMenu>
        </Box>
        <CustomLoadingButton onClick={onSave} loading={saving}>
          Save
        </CustomLoadingButton>
      </Box>

      <Box>
        <Box textAlign={"center"}>
          <Box
            component={"img"}
            sx={{
              mt: 2,
              height: "150px",
              width: "150px",
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))"
            }}
            src={team2?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography variant="body1" textAlign={"center"} fontSize={"1.5rem"} color={"white"}>
            {team2?.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MapBans;
