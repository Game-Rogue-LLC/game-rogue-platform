import {
  Accor,
  Box,
  Button,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import { ArrowForwardIosSharp } from "@mui/icons-material";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { MATCH_STATES } from "@/src/config/global";
import MatchDialog from "@/src/components/dialog/MatchDialog";
import TeamItem from "@/src/components/item/TeamItem";
import _ from "lodash";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharp sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

const MatchTable = ({ matches, eid, myTeam }) => {
  const theme = useTheme();
  const { match, team, event } = useTournamentContext();
  const [deleting, setDeleting] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [denying, setDenying] = useState(false);
  const [format, setFormat] = useState(0);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isMatchDialogOpen, setMatchDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState("1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (event?.events[eid]) {
      setFormat(event.events[eid].format);
    }
  }, [eid, event?.events]);

  const getStatus = (status) => {
    let name = "";
    Object.keys(MATCH_STATES).forEach((key) => {
      if (MATCH_STATES[key].value == status) name = MATCH_STATES[key].name;
    });
    return name;
  };

  const currentMatches = useMemo(() => {
    return matches.filter((val) => val.status != MATCH_STATES.FINISHED.value);
  }, [matches]);

  const pastMatches = useMemo(() => {
    return matches.filter((val) => val.status == MATCH_STATES.FINISHED.value);
  }, [matches]);

  const matchesByRound = useMemo(() => {
    const temp = _.groupBy(
      matches.filter((val) => val.participants.length > 0),
      (val) => val.round
    );
    setExpanded("round" + Object.keys(temp).reverse()[0]);
    return temp;
  }, [matches]);

  const deleteMatch = async (id) => {
    setDeleting(true);
    const res = await match.fullDelete(id);
    if (res.code === "succeed") {
      enqueueSnackbar("Match data deleted successfully!", { variant: "success" });
    }
    setDeleting(false);
  };
  const acceptMatchRequest = async (id) => {
    setAccepting(true);
    const res = await match.update(id, {
      status: MATCH_STATES.SCHEDULED.value
    });
    if (res.code === "succeed") {
      enqueueSnackbar("You have accepted a challenge!", { variant: "success" });
    }
    setAccepting(false);
  };
  const denyMatchRequest = async (id) => {
    setAccepting(true);
    const res = await match.fullDelete(id);
    if (res.code === "succeed") {
      enqueueSnackbar("You have denied a challenge!", { variant: "success" });
    }
    setAccepting(false);
  };

  const isMyMatch = (match) => {
    if (format == 0 || format == 1) {
      if (match.participants[0].id == myTeam || match.participants[1].id == myTeam) return true;
    }
    if (format == 2) {
      if (match.self == myTeam || match.opponent == myTeam) return true;
    }
    return false;
  };

  const handleMatchClick = (id) => {
    setSelectedMatch(matches[matches.findIndex((val) => val.id == id)]);
    setMatchDialogOpen(true);
  };
  const handleCloseMatchDialog = (id) => {
    setMatchDialogOpen(false);
  };

  return (
    <Box>
      {selectedMatch && selectedMatch.participants?.length == 2 && (
        <MatchDialog
          open={isMatchDialogOpen}
          title="Match Info"
          team1={team.teams[selectedMatch.participants[0].id]}
          team2={team.teams[selectedMatch.participants[1].id]}
          score1={selectedMatch.participants[0].score}
          score2={selectedMatch.participants[1].score}
          onClose={handleCloseMatchDialog}
        />
      )}

      {Object.keys(matchesByRound).length > 0 ? (
        Object.keys(matchesByRound)
          .reverse()
          .map((round) => (
            <Accordion
              key={`round${round}`}
              expanded={expanded === `round${round}`}
              onChange={handleChange(`round${round}`)}
            >
              <AccordionSummary aria-controls={`round${round}-content`} id={`round${round}-header`}>
                <Typography variant="h5">{`Round ${round}`}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TableContainer component={Paper} variant="elevation" sx={{ width: "100%", mt: 2 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>TEAM1</TableCell>
                        <TableCell>TEAM2</TableCell>
                        <TableCell align="center">START</TableCell>
                        <TableCell align="center">END</TableCell>
                        <TableCell align="center">STATUS</TableCell>
                        {format == 2 && <TableCell align="center">Action</TableCell>}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {matchesByRound[round] && matchesByRound[round].length > 0 ? (
                        matchesByRound[round].map((item, i) => {
                          if (item.participants?.length == 2 || format == 2) {
                            return (
                              <TableRow
                                hover
                                key={item.id}
                                onClick={() => handleMatchClick(item.id)}
                                sx={{ cursor: "pointer" }}
                              >
                                <TableCell
                                  sx={{
                                    color: isMyMatch(item) ? theme.palette.primary.main : "white"
                                  }}
                                >
                                  {format == 0 ? (
                                    <TeamItem
                                      team={team?.teams[item.participants[0].id]}
                                      sx={{
                                        justifyContent: "left",
                                        color: isMyMatch(item)
                                          ? theme.palette.primary.main
                                          : "white"
                                      }}
                                    />
                                  ) : format == 1 ? (
                                    <TeamItem
                                      team={team?.teams[item.participants[0].id]}
                                      sx={{
                                        justifyContent: "left",
                                        color: isMyMatch(item)
                                          ? theme.palette.primary.main
                                          : "white"
                                      }}
                                    />
                                  ) : format == 2 ? (
                                    <TeamItem
                                      team={team?.teams[item.self]}
                                      sx={{
                                        justifyContent: "left",
                                        color: isMyMatch(item)
                                          ? theme.palette.primary.main
                                          : "white"
                                      }}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </TableCell>
                                <TableCell>
                                  {format == 0 ? (
                                    <TeamItem
                                      team={team?.teams[item.participants[1].id]}
                                      sx={{
                                        justifyContent: "left",
                                        color: isMyMatch(item)
                                          ? theme.palette.primary.main
                                          : "white"
                                      }}
                                    />
                                  ) : format == 1 ? (
                                    <TeamItem
                                      team={team?.teams[item.participants[1].id]}
                                      sx={{
                                        justifyContent: "left",
                                        color: isMyMatch(item)
                                          ? theme.palette.primary.main
                                          : "white"
                                      }}
                                    />
                                  ) : format == 2 ? (
                                    <TeamItem
                                      team={team?.teams[item.opponent]}
                                      sx={{
                                        justifyContent: "left",
                                        color: isMyMatch(item)
                                          ? theme.palette.primary.main
                                          : "white"
                                      }}
                                    />
                                  ) : (
                                    <></>
                                  )}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    color: isMyMatch(item) ? theme.palette.primary.main : "white"
                                  }}
                                >
                                  {dayjs(item.start).format("YYYY.MM.DD")}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    color: isMyMatch(item) ? theme.palette.primary.main : "white"
                                  }}
                                >
                                  {dayjs(item.end).format("YYYY.MM.DD")}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{
                                    color: isMyMatch(item) ? theme.palette.primary.main : "white"
                                  }}
                                >
                                  {getStatus(item.status)}
                                </TableCell>
                                {format == 2 && (
                                  <TableCell align="center">
                                    {item.self == myTeam
                                      ? item.status == MATCH_STATES.SCHEDULING.value && (
                                          <LoadingButton
                                            loading={deleting}
                                            variant="contained"
                                            size="small"
                                            sx={{
                                              backgroundColor: theme.palette.error.main,
                                              color: "white"
                                            }}
                                            onClick={(e) => deleteMatch(item.id)}
                                          >
                                            Cancel
                                          </LoadingButton>
                                        )
                                      : item.opponent == myTeam &&
                                        item.status == MATCH_STATES.SCHEDULING.value && (
                                          <Box>
                                            <LoadingButton
                                              loading={accepting}
                                              variant="contained"
                                              size="small"
                                              sx={{
                                                backgroundColor: theme.palette.error.main,
                                                color: "white"
                                              }}
                                              onClick={(e) => acceptMatchRequest(item.id)}
                                            >
                                              Accept
                                            </LoadingButton>
                                            <LoadingButton
                                              loading={denying}
                                              variant="contained"
                                              size="small"
                                              sx={{
                                                backgroundColor: theme.palette.error.main,
                                                color: "white"
                                              }}
                                              onClick={(e) => denyMatchRequest(item.id)}
                                            >
                                              Deny
                                            </LoadingButton>
                                          </Box>
                                        )}
                                  </TableCell>
                                )}
                              </TableRow>
                            );
                          }
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            NO MATCHES
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))
      ) : (
        <></>
      )}
      {/*
      <Typography variant="h5">
        Current Matches
      </Typography>
      <TableContainer component={Paper} variant='elevation' sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TEAM1</TableCell>
              <TableCell>TEAM2</TableCell>
              <TableCell align='center'>START</TableCell>
              <TableCell align='center'>END</TableCell>
              <TableCell align='center'>STATUS</TableCell>
              {format == 2 && <TableCell align='center'>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && currentMatches.length > 0
              ? currentMatches.map((item, i) => {
                if (item.participants?.length == 2 || format == 2) {
                  return (
                    <TableRow hover key={item.id} onClick={() => handleMatchClick(item.id)} sx={{ cursor: 'pointer' }}>
                      <TableCell sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {format == 0
                          ? <TeamItem
                            team={team?.teams[item.participants[0].id]}
                            sx={{
                              justifyContent: 'left',
                              color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                            }}
                          />
                          : format == 1
                            ? <TeamItem
                              team={team?.teams[item.participants[0].id]}
                              sx={{
                                justifyContent: 'left',
                                color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                              }}
                            />
                            : format == 2
                              ? <TeamItem
                                team={team?.teams[item.self]}
                                sx={{
                                  justifyContent: 'left',
                                  color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                                }}
                              />
                              : <></>}
                      </TableCell>
                      <TableCell>
                        {format == 0
                          ? <TeamItem
                            team={team?.teams[item.participants[1].id]}
                            sx={{
                              justifyContent: 'left',
                              color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                            }}
                          />
                          : format == 1
                            ? <TeamItem
                              team={team?.teams[item.participants[1].id]}
                              sx={{
                                justifyContent: 'left',
                                color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                              }}
                            />
                            : format == 2
                              ? <TeamItem
                                team={team?.teams[item.opponent]}
                                sx={{
                                  justifyContent: 'left',
                                  color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                                }}
                              />
                              : <></>}
                      </TableCell>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {dayjs(item.start).format('YYYY.MM.DD')}
                      </TableCell>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {dayjs(item.end).format('YYYY.MM.DD')}
                      </TableCell>
                      <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                        {getStatus(item.status)}
                      </TableCell>
                      {format == 2 &&
                        <TableCell align='center'>
                          {item.self == myTeam
                            ? (item.status == MATCH_STATES.SCHEDULING.value &&
                              <LoadingButton
                                loading={deleting}
                                variant='contained'
                                size="small"
                                sx={{
                                  backgroundColor: theme.palette.error.main,
                                  color: 'white'
                                }}
                                onClick={(e) => deleteMatch(item.id)}
                              >
                                Cancel
                              </LoadingButton>)
                            : (item.opponent == myTeam && item.status == MATCH_STATES.SCHEDULING.value &&
                              <Box>
                                <LoadingButton
                                  loading={accepting}
                                  variant='contained'
                                  size="small"
                                  sx={{
                                    backgroundColor: theme.palette.error.main,
                                    color: 'white'
                                  }}
                                  onClick={(e) => acceptMatchRequest(item.id)}
                                >
                                  Accept
                                </LoadingButton>
                                <LoadingButton
                                  loading={denying}
                                  variant='contained'
                                  size="small"
                                  sx={{
                                    backgroundColor: theme.palette.error.main,
                                    color: 'white'
                                  }}
                                  onClick={(e) => denyMatchRequest(item.id)}
                                >
                                  Deny
                                </LoadingButton>
                              </Box>)}
                        </TableCell>}
                    </TableRow>
                  )
                }
              })
              : <TableRow>
                <TableCell colSpan={6} align="center">
                  NO MATCHES
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" sx={{ marginTop: 5 }}>
        Past Matches
      </Typography>
      <TableContainer component={Paper} variant='elevation' sx={{ width: '100%', mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>TEAM1</TableCell>
              <TableCell>TEAM2</TableCell>
              <TableCell align='center'>START</TableCell>
              <TableCell align='center'>END</TableCell>
              <TableCell align='center'>STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && pastMatches.length > 0
              ? pastMatches.map((item, i) => (
                <TableRow hover key={item.id} onClick={() => handleMatchClick(item.id)} sx={{ cursor: 'pointer' }}>
                  <TableCell sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                    {format == 0
                      ? <TeamItem
                        team={team?.teams[item.participants[0].id]}
                        sx={{
                          justifyContent: 'left',
                          color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                        }}
                      />
                      : format == 1
                        ? <TeamItem
                          team={team?.teams[item.participants[0].id]}
                          sx={{
                            justifyContent: 'left',
                            color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                          }}
                        />
                        : format == 2
                          ? <TeamItem
                            team={team?.teams[item.self]}
                            sx={{
                              justifyContent: 'left',
                              color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                            }}
                          />
                          : <></>}
                  </TableCell>
                  <TableCell>
                    {format == 0
                      ? <TeamItem
                        team={team?.teams[item.participants[1].id]}
                        sx={{
                          justifyContent: 'left',
                          color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                        }}
                      />
                      : format == 1
                        ? <TeamItem
                          team={team?.teams[item.participants[1].id]}
                          sx={{
                            justifyContent: 'left',
                            color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                          }}
                        />
                        : format == 2
                          ? <TeamItem
                            team={team?.teams[item.opponent]}
                            sx={{
                              justifyContent: 'left',
                              color: (isMyMatch(item) ? theme.palette.primary.main : 'white')
                            }}
                          />
                          : <></>}
                  </TableCell>
                  <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                    {dayjs(item.start).format('YYYY.MM.DD')}
                  </TableCell>
                  <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                    {dayjs(item.end).format('YYYY.MM.DD')}
                  </TableCell>
                  <TableCell align='center' sx={{ color: (isMyMatch(item) ? theme.palette.primary.main : 'white') }}>
                    {getStatus(item.status)}
                  </TableCell>
                </TableRow>
              ))
              : <TableRow>
                <TableCell colSpan={5} align="center">
                  NO MATCHES
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>*/}
    </Box>
  );
};

export default MatchTable;
