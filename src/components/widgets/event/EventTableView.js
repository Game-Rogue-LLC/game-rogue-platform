import LadderEliminationTableView from "@/src/components/widgets/event/LadderEliminationTableView";
import SingleEliminationTableView from "@/src/components/widgets/event/SingleEliminationTableView";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DoubleEliminationTableView from "@/src/components/widgets/event/DoubleEliminationTableView";
import StandingTable from "@/src/components/widgets/event/StandingTable";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useStyleContext } from "@/src/context/StyleContext";

const EventTableView = ({ format, myTeam, eid, matches }) => {
  const { colors } = useStyleContext();
  const { event } = useTournamentContext();
  const [tab, setTab] = useState("1");

  const handleChangeTabs = (e, newTab) => {
    setTab(newTab);
  };
  return (
    <TabContext value={tab}>
      <TabList
        onChange={handleChangeTabs}
        TabIndicatorProps={{ sx: { backgroundColor: colors.primary } }}
      >
        <Tab
          value="1"
          label="Matches"
          sx={{ "&.Mui-selected": { color: colors.primary } }}
        />
        <Tab
          value="2"
          label="Standing"
          sx={{ "&.Mui-selected": { color: colors.primary } }}
        />
      </TabList>
      <TabPanel value="1">
        {format == 0 ? (
          <SingleEliminationTableView
            myTeam={myTeam}
            eid={eid}
            matches={matches}
          />
        ) : format == 1 ? (
          <DoubleEliminationTableView
            myTeam={myTeam}
            eid={eid}
            matches={matches}
          />
        ) : format == 2 ? (
          <LadderEliminationTableView
            myTeam={myTeam}
            eid={eid}
            matches={matches}
          />
        ) : (
          <></>
        )}
      </TabPanel>
      <TabPanel value="2">
        <StandingTable
          data={event?.events[eid]?.participants}
          sortBy={["score", "wins", "draws", "loses"]}
        />
      </TabPanel>
    </TabContext>
  );
};

export default EventTableView;
