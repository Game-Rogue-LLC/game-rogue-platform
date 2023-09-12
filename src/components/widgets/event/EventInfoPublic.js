import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  LinearProgress,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Typography,
  styled
} from "@mui/material";
import { EVENT_FORMATS, EVENT_STATES, TICKET_TYPES } from "@/src/config/global";
import { useEffect, useMemo, useState } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";
import { GAMES } from "@/src/config/global";
import { LoadingButton } from "@mui/lab";
import TeamItem from "@/src/components/item/TeamItem";
import TeamRegisterDialog from "./TeamRegisterDialog";
import { buttonStyle } from "@/src/utils/utils";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
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
  const { organization, event, ticket, team, currentTime } = useTournamentContext();
  const [myTeam, setMyTeam] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(0);
  const [registering, setRegistering] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

  const myTeams = useMemo(() => {
    if (team?.teams) {
      return Object.keys(team.teams).filter((key) => team.teams[key].uid === user?.id);
    }
    return [];
  }, [team?.teams, user]);

  // <a href="https://link.clover.com/urlshortener/8ZGvTs" style="background-color:#f5831f;border:1px solid #f5831f;min-height:50px;color:#000;padding:10px 20px;text-decoration:none;border-radius:4px;">REGISTER  $30.00</a>
  useEffect(() => {
    if (currentTime) {
      if (dayjs(currentTime).isAfter(dayjs(endTime))) setRegistrationStatus(2);
      else if (dayjs(currentTime).isBefore(dayjs(startTime))) setRegistrationStatus(0);
      else setRegistrationStatus(1);
    }
  }, [currentTime]);

  // useEffect(() => {
  //   if (myTeams.length > 0) {
  //     setMyTeam(myTeams[0]);
  //   }
  // }, [myTeams]);

  const handleSelectTeam = (e) => {
    const { value } = e.target;
    setMyTeam(value);
  };

  const handleLogin = (e) => {
    router.push("/auth");
  };

  const onOpenRegisterDialog = (e) => {
    setOpenRegisterDialog(true);
  };
  const onCloseRegisterDialog = () => {
    setOpenRegisterDialog(false);
  };
  const onRegisterTeam = async ({ text }) => {
    if (_.find(event.events[eid]?.participants, (val) => val.id === myTeam)) {
      return {
        code: "failed",
        message: "Team already registered!"
      };
    }

    if (_.size(event.events[eid]?.participants) >= event.events[eid]?.participantsCount) {
      return {
        code: "failed",
        message: `Only ${event.events[eid]?.participantsCount} teams can register!`
      };
    }

    const newTicket = {
      type: TICKET_TYPES.TEAM_REGISTER_REQUEST,
      sender: user.id,
      receiver: organization.organizations[event.events[eid]?.oid]?.uid,
      data: {
        team: myTeam,
        event: eid,
        text
      },
      openedAt: new Date(),
      createdAt: new Date(),
      deleted: false
    };

    const res = await ticket.create(newTicket);
    return res;
  };
  const onCreateTeam = () => {
    router.push("/team/create");
  };

  return (
    <Grid container spacing={2} rowSpacing={3} sx={{ mt: 2 }}>
      <Grid item xs={12} lg={6}>
        <Grid container spacing={2} rowSpacing={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                minHeight: "200px",
                backgroundColor: secondaryBackgroundColor
              }}
            >
              <Typography variant="h4" fontSize={24} color={colors.primary}>
                Contribute
              </Typography>
              <Typography variant="h6">
                CROWDFUND GOAL:{" $"}
                {organization.organizations[event.events[eid]?.oid]?.crowdFund}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={
                  organization.organizations[event.events[eid]?.oid]?.crowdFund
                    ? (organization.organizations[event.events[eid]?.oid]?.actualFund * 100.0) /
                        organization.organizations[event.events[eid]?.oid]?.crowdFund +
                      5
                    : 0
                }
              />
              <Button variant="contained" sx={{ ...buttonStyle(colors.primary), mt: 3 }}>
                Contribute
              </Button>
            </Paper>
          </Grid>
        </Grid>
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
              {GAMES[item?.game]?.name}
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
        {(/* item?.status < EVENT_STATES.STARTED.value || */
          dayjs(item?.registerTo).isAfter(new Date())) && (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, backgroundColor: secondaryBackgroundColor }}>
              {user && (
                <>
                  <InputLabel id="team-select-label">Select your team</InputLabel>
                  <TeamSelect
                    labelId="team-select-label"
                    id="team-select"
                    value={myTeam}
                    name="team"
                    // size="small"
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
                          {item?.name}
                        </MenuItem>
                      );
                    })}
                  </TeamSelect>
                </>
              )}
              {!user ? (
                <CustomButton
                  variant="contained"
                  sx={{ width: "100%", mt: 1 }}
                  onClick={handleLogin}
                >
                  Login to Register
                </CustomButton>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", mt: 1, gap: 1 }}>
                  <TeamRegisterDialog
                    open={openRegisterDialog}
                    onClose={onCloseRegisterDialog}
                    onRegister={onRegisterTeam}
                    eid={eid}
                  />

                  <LoadingButton
                    loading={registering}
                    variant="contained"
                    sx={{
                      flex: 1,
                      ...buttonStyle(organization.organizations[event.events[eid]?.oid]?.primary)
                    }}
                    onClick={onOpenRegisterDialog}
                    disabled={
                      myTeam === ""

                      // dayjs(currentTime).isBefore(startTime) || dayjs(currentTime).isAfter(endTime)
                    }
                  >
                    Register
                  </LoadingButton>

                  <CustomButton onClick={onCreateTeam}>Create Team</CustomButton>
                </Box>
              )}
            </Paper>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default EventInfoPublic;
