import {
  Box,
  Button,
  Checkbox,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { DEFAULT_LOGO } from "@/src/config/global";
import { Check, CheckBoxOutlineBlank, Close } from "@mui/icons-material";
import { useAuthContext } from "@/src/context/AuthContext";
import _ from "lodash";
import { useStyleContext } from "@/src/context/StyleContext";
import { LoadingButton } from "@mui/lab";

const maps = [
  {
    title: "Bank",
    image: "/static/images/maps/Bank.png",
  },
  {
    title: "Border",
    image: "/static/images/maps/Border.png",
  },
  {
    title: "Chalet",
    image: "/static/images/maps/Chalet.png",
  },
  {
    title: "Club House",
    image: "/static/images/maps/Clubhouse.png",
  },
  {
    title: "Cafe",
    image: "/static/images/maps/Kafe.png",
  },
  {
    title: "Oregon",
    image: "/static/images/maps/Oregon.png",
  },
  {
    title: "Sky Scraper",
    image: "/static/images/maps/Skyscraper.png",
  },
  {
    title: "Theme Park",
    image: "/static/images/maps/Theme_park.png",
  },
  {
    title: "Villa",
    image: "/static/images/maps/Villa.png",
  },
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

const MapBans = ({ item, onComplete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useAuthContext();
  const { team, match } = useTournamentContext();
  const { buttonStyle } = useStyleContext();
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [banned1, setBanned1] = useState(_.fill(Array(maps.length), 0));
  const [banned2, setBanned2] = useState(_.fill(Array(maps.length), 0));
  const [saving, setSaving] = useState(false);

  const isMyTeam = (team) => {
    return team?.uid === user?.id;
  };

  const onMapBan = (e, ind) => {
    if (isMyTeam(team1))
      setBanned1((val) =>
        val.map((ban, i) => (i === ind ? (ban + 1) % 3 : ban))
      );
    else if (isMyTeam(team2))
      setBanned2((val) =>
        val.map((ban, i) => (i === ind ? (ban + 1) % 3 : ban))
      );
  };

  const onSave = async (e) => {
    setSaving(true);
    if (isMyTeam(team1)) {
      const res = await match.update(item.id, { mapbans: { 0: banned1 } });
      if (res.code === "succeed") {
        alert("Saved successfully!");
        onComplete();
      } else {
        console.error(res.message);
      }
    } else if (isMyTeam(team2)) {
      const res = await match.update(item.id, { mapbans: { 1: banned2 } });
      if (res.code === "succeed") {
        alert("Saved successfully!");
        onComplete();
      } else {
        console.error(res.message);
      }
    }
    setSaving(false);
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
    if (item?.participants[0]?.id)
      setTeam1(team?.teams[item.participants[0].id]);
    if (item?.participants[1]?.id)
      setTeam2(team?.teams[item.participants[1].id]);
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
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))",
            }}
            src={team1?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color={"white"}
          >
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
          zIndex: 500,
        }}
      >
        <Box>
          <Button
            id="map-bans-btn"
            variant="contained"
            aria-controls={open ? "map-bans-menu" : undefined}
            aria-haspopup="true"
            onClick={onOpen}
            sx={{ ...buttonStyle }}
          >
            Map Bans
          </Button>
          <Menu
            id="map-bans-menu"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
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
                    justifyContent: "center",
                  }}
                >
                  {/* <ThreeStateCheckbox /> */}
                  {banned1[i] === 1 ? (
                    <Close />
                  ) : banned1[i] === 2 ? (
                    <Check />
                  ) : (
                    <></>
                  )}
                </Box>

                <Tooltip title={img.title}>
                  <Box
                    sx={{
                      width: "200px",
                      height: "50px",
                      backgroundImage: "url(" + img.image + ")",
                      backgroundSize: "cover",
                    }}
                  ></Box>
                </Tooltip>

                <Box
                  sx={{
                    width: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <ThreeStateCheckbox /> */}
                  {banned2[i] === 1 ? (
                    <Close />
                  ) : banned2[i] === 2 ? (
                    <Check />
                  ) : (
                    <></>
                  )}
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <LoadingButton
          sx={{ ...buttonStyle }}
          onClick={onSave}
          loading={saving}
        >
          Save
        </LoadingButton>
      </Box>

      <Box>
        <Box textAlign={"center"}>
          <Box
            component={"img"}
            sx={{
              mt: 2,
              height: "150px",
              width: "150px",
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))",
            }}
            src={team2?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color={"white"}
          >
            {team2?.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MapBans;
