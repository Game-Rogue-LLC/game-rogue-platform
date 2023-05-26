import { useState, useEffect } from "react";
import { useStyleContext } from "@/src/context/StyleContext";
import { numberLang } from "@/src/utils/utils";
import { Box, Button, Divider, Tab, Tooltip, Typography, useTheme } from "@mui/material";
import { useTournamentContext } from "@/src/context/TournamentContext";
import TeamScoreBoard from "./TeamScoreBoard";
import MatchChat from "./MatchChat";
import { useAuthContext } from "@/src/context/AuthContext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useRouter } from "next/router";
import CustomButton from "@/src/components/button/CustomButton";

const MatchScoreBoard = ({ item }) => {
  const theme = useTheme();
  const router = useRouter();
  const { team, event } = useTournamentContext();
  const { user } = useAuthContext();
  const [myTeam, setMyTeam] = useState(null);
  const [opTeam, setOpTeam] = useState(null);
  const [tab, setTab] = useState("1");

  const isMyTeam = (team) => {
    return team.uid === user.id;
  };

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    if (isMyTeam(team?.teams[item?.participants[0]?.id])) {
      setMyTeam(team.teams[item.participants[0].id]);
      setOpTeam(team.teams[item.participants[1].id]);
    } else if (isMyTeam(team?.teams[item?.participants[1]?.id])) {
      setMyTeam(team.teams[item.participants[1].id]);
      setOpTeam(team.teams[item.participants[0].id]);
    }
  }, [team?.teams, item]);

  const onBansBtnClick = (e) => {};
  const onRulebookBtnClick = (e) => {
    if (event?.events[item.eid]?.rulebook) router.push(event.events[item.eid].rulebook);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 5 }}>
        <CustomButton onClick={onBansBtnClick}>BANS</CustomButton>
        <CustomButton onClick={onRulebookBtnClick}>RULEBOOK</CustomButton>
      </Box>
      <TabContext value={tab}>
        <TabList onChange={onTabChange} sx={{ mt: 2 }}>
          {item?.maps &&
            item.maps.map((val, i) => (
              <Tab value={`${i + 1}`} label={`Map ${numberLang(i + 1)}`} />
            ))}
        </TabList>
        {item?.maps &&
          item.maps.map((val, i) => (
            <TabPanel value={`${i + 1}`}>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: 2
                  }}>
                  <TeamScoreBoard item={opTeam} sx={{ flexGrow: 1 }} />
                  <CustomButton variant="contained" sx={{ width: "250px" }}>
                    Full Analysis
                  </CustomButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    pl: "175px",
                    pr: "270px"
                  }}>
                  <Box>
                    <Tooltip title={val.title}>
                      <img
                        src={val.image}
                        height={50}
                        width={200}
                        style={{ objectFit: "cover", objectPosition: "center" }}
                      />
                    </Tooltip>
                  </Box>
                  <Box
                    sx={{ borderLeft: "solid 2px lightgray", width: "0px", height: "50px" }}></Box>
                  <Box
                    sx={{
                      textAlign: "center"
                    }}>
                    <Typography variant="h4" color="white">
                      {(Math.random() * 10).toFixed(0)} - {(Math.random() * 10).toFixed(0)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ borderLeft: "solid 2px lightgray", width: "0px", height: "50px" }}></Box>
                  <Box>
                    <Typography variant="h4" color="white">
                      Banned Operators
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    gap: 2
                  }}>
                  <TeamScoreBoard item={myTeam} sx={{ flexGrow: 1 }} />
                  <MatchChat item={item} />
                </Box>
              </Box>
            </TabPanel>
          ))}
      </TabContext>
    </Box>
  );
};

export default MatchScoreBoard;
