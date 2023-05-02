import LadderEliminationTableView from "@/src/components/widgets/event/LadderEliminationTableView";
import SingleEliminationTableView from "@/src/components/widgets/event/SingleEliminationTableView";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DoubleEliminationTableView from "@/src/components/widgets/event/DoubleEliminationTableView";

const EventTableView = ({ format, myTeam, eid, matches }) => {
  const [tab, setTab] = useState("1");

  const handleChangeTabs = (e, newTab) => {
    setTab(newTab);
  }
  return (
    <TabContext value={tab}>
      <TabList onChange={handleChangeTabs}>
        <Tab value="1" label="Matches" />
        <Tab value="2" label="Standing" />
      </TabList>
      <TabPanel value="1">
        {
          format == 0
            ? <SingleEliminationTableView myTeam={myTeam} eid={eid} matches={matches} />
            : format == 1
              ? <DoubleEliminationTableView myTeam={myTeam} eid={eid} matches={matches} />
              : format == 2
                ? <LadderEliminationTableView myTeam={myTeam} eid={eid} matches={matches} />
                : <></>
        }
      </TabPanel>
      <TabPanel value="2">
        Panel2
      </TabPanel>
    </TabContext>
  )
}

export default EventTableView;