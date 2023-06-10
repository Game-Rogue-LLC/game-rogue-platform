import {
  Button,
  Chip,
  Grid,
  InputBase,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled
} from "@mui/material";
import { EVENT_FORMATS, EVENT_STATES } from "@/src/config/global";
import { useEffect, useMemo, useState } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";
import { LoadingButton } from "@mui/lab";
import TeamItem from "@/src/components/item/TeamItem";
import dayjs from "dayjs";
import { games } from "@/src/components/dropdown/GameSelect";
import { markdownToHtml } from "@/src/utils/html-markdown";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const TeamSelectInput = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1),
    borderRadius: 4,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    position: "relative",
    display: "flex",
    alignItems: "center",
    "& .MuiListItemIcon-root": {
      minWidth: "40px",
      "& :hover": {
        border: "none"
      }
    }
  }
}));

const TeamSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    minHeight: "2em !important"
  }
}));

const EventInfoPublic = ({ eid, item, startTime, endTime }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { colors, secondaryBackgroundColor, fontColor } = useStyleContext();
  const { organization, event, team, currentTime } = useTournamentContext();
  const [myTeam, setMyTeam] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(0);
  const [registering, setRegistering] = useState(false);

  const myTeams = useMemo(() => {
    if (team?.teams) {
      return Object.keys(team.teams).filter((key) => team.teams[key].uid === user?.id);
    }
    return [];
  }, [team?.teams, user]);

  useEffect(() => {
    if (currentTime) {
      if (dayjs(currentTime).isAfter(dayjs(endTime))) setRegistrationStatus(2);
      else if (dayjs(currentTime).isBefore(dayjs(startTime))) setRegistrationStatus(0);
      else setRegistrationStatus(1);
    }
  }, [currentTime]);

  useEffect(() => {
    if (myTeams.length > 0) {
      setMyTeam(myTeams[0]);
    }
  }, [myTeams]);

  const handleSelectTeam = (e) => {
    const { value } = e.target;
    setMyTeam(value);
  };

  const handleLogin = (e) => {
    router.push("/auth");
  };

  const handleRegister = async (e) => {
    setRegistering(true);
    const res = await event.addParticipant(eid, myTeam);
    setRegistering(false);
    if (res.code === "succeed") {
      if (organization.organizations[event.events[eid].oid]?.uid == user?.id)
        router.push("/participant?event=" + eid);
      else alert("Registered Successfully!");
    } else if (res.code === "failed") {
      console.warn(res.message);
    }
  };

  return (
    <Grid container spacing={2} rowSpacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} lg={6}>
        <Paper
          sx={{
            p: 3,
            minHeight: "200px",
            backgroundColor: secondaryBackgroundColor
          }}
        >
          <Typography variant="h4" fontSize={24} color={colors.primary}>
            Description
          </Typography>
          <div
            className="html-wrapper"
            style={{ marginTop: "16px" }}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(item?.description)
            }}
          ></div>
        </Paper>
      </Grid>
      <Grid item xs={12} lg={6} container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              backgroundColor: secondaryBackgroundColor
            }}
          >
            <Typography variant="h4" fontSize={24} color={colors.primary}>
              Registration
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {startTime.toLocaleString()}
              &nbsp;-&nbsp;
              {endTime.toLocaleString()}
            </Typography>
            {registrationStatus == 0 ? (
              <Chip label="Register" sx={{ mt: 1 }} />
            ) : (
              <Chip label="Closed" sx={{ mt: 1 }} />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              backgroundColor: secondaryBackgroundColor
            }}
          >
            <Typography variant="h4" fontSize={24} color={colors.primary}>
              Game
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {games[item?.game]}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              backgroundColor: secondaryBackgroundColor
            }}
          >
            <Typography variant="h4" fontSize={24} color={colors.primary}>
              Platform
            </Typography>
            <Chip label={"PC"} sx={{ mt: 1 }} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              backgroundColor: secondaryBackgroundColor
            }}
          >
            <Typography variant="h4" fontSize={24} color={colors.primary}>
              Format
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {EVENT_FORMATS[item?.format]?.name}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              backgroundColor: secondaryBackgroundColor
            }}
          >
            <Typography variant="h4" fontSize={24} color={colors.primary}>
              Participants
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {item?.participantsCount}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, backgroundColor: secondaryBackgroundColor }}>
            {user && (
              <TeamSelect
                labelId="team-select-label"
                id="team-select"
                value={myTeam}
                name="team"
                size="small"
                onChange={handleSelectTeam}
                variant="outlined"
                sx={{
                  mt: 1
                }}
                fullWidth
                input={<TeamSelectInput />}
                inputProps={{
                  MenuProps: {
                    disableScrollLock: true
                  }
                }}
              >
                {myTeams?.map((tid) => {
                  const item = team.teams[tid];
                  return (
                    <MenuItem
                      key={"team_" + tid}
                      value={tid}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ListItemIcon>
                        <img
                          src={item?.darkLogo || DEFAULT_CONTENTBLOCK_IMAGE}
                          height={30}
                          width={30}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center"
                          }}
                        />
                      </ListItemIcon>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </TeamSelect>
            )}
            {!user ? (
              <CustomButton variant="contained" sx={{ width: "100%", mt: 1 }} onClick={handleLogin}>
                Login to Register
              </CustomButton>
            ) : (
              <CustomLoadingButton
                loading={registering}
                variant="contained"
                sx={{ width: "100%", mt: 1 }}
                onClick={handleRegister}
                disabled={
                  dayjs(currentTime).isBefore(startTime) || dayjs(currentTime).isAfter(endTime)
                }
              >
                Register to an event
              </CustomLoadingButton>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EventInfoPublic;
