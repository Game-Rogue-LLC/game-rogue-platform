import { useEffect, useState } from "react";
import { Container, Tab, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import _ from "lodash";

import { useAppContext } from "@/src/context/app";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useStyleContext } from "@/src/context/StyleContext";
import PublicLayout from "@/src/content/PublicLayout";
import MatchSchedule from "@/src/components/widgets/rogue-social/MatchSchedule";
import MatchShare from "@/src/components/widgets/rogue-social/MatchShare";
import MapBans from "@/src/components/widgets/rogue-social/MapBans";
import MatchScoreBoard from "@/src/components/widgets/rogue-social/MatchScoreBoard";
import { MATCH_STATES } from "@/src/config/global";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors, buttonStyle } = useStyleContext();
  const { ticket, match } = useTournamentContext();
  const [tab, setTab] = useState("1");
  const [mid, setMID] = useState(router?.query?.mid);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [matchTime, setMatchTime] = useState(new Date());

  useEffect(() => {
    if (router?.query?.id && router.query.id !== mid) {
      setMID(router.query.id);
    }
    // if (router?.query?.tab) {
    //   setTab(router.query.tab);
    // }
  }, [router]);

  // useEffect(() => {
  //   if (tab !== 2 && item?.status == MATCH_STATES.SCHEDULED.value) {
  //     setTab(2);
  //   }
  //   if (tab !== 1 && item?.status < MATCH_STATES.SCHEDULED.value) {
  //     setTab(1);
  //   }
  // }, [tab, item]);

  // useEffect(() => {
  //   if (mid && tab && router && tab != router.query.tab)
  //     router.push("/match/" + mid + "/chat?tab=" + tab);
  // }, [tab]);

  useEffect(() => {
    if (match?.matches) {
      setItem(match.matches.find((val) => val.id === mid));
    }
  }, [match?.matches, mid]);

  useEffect(() => {
    if (item?.step) setStep(item.step);
    if (item?.start) {
      setMatchTime(item.start);
    }
    if (tab === "1" && item?.status === MATCH_STATES.SCHEDULED.value) setTab("2");
  }, [item]);

  useEffect(() => {
    setTitle("MATCH CHAT");
  }, []);

  // const onPrevBtnClick = (e) => {
  //   if (step > 0) setStep((val) => val - 1);
  // };

  const onNext = (e) => {
    console.log(step);
    setStep((val) => val + 1);
  };

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    if (item && item.step !== step) {
      match.update(item.id, { step: step });
    }
  }, [step]);

  // if (step === 0) {
  //   return (
  //     <Container sx={{ padding: 5 }}>
  //       <MatchSchedule
  //         matchTime={matchTime}
  //         setMatchTime={setMatchTime}
  //         item={item}
  //       />
  //     </Container>
  //   );
  // } else if (step === 1) {
  //   return (
  //     <Container sx={{ padding: 5 }}>
  //       <MatchShare matchTime={matchTime} onComplete={onNext} />
  //     </Container>
  //   );
  // } else if (step === 2) {
  //   return (
  //     <Container sx={{ padding: 5 }}>
  //       <MapBans item={item} onComplete={onNext} />
  //     </Container>
  //   );
  // } else if (step === 3) {
  //   return (
  //     <Container sx={{ padding: 5 }}>
  //       <MatchScoreBoard item={item} onComplete={onNext} />
  //     </Container>
  //   );
  // }
  return (
    <Container sx={{ padding: 5 }}>
      <TabContext value={tab}>
        <TabList onChange={onTabChange}>
          {item?.status !== MATCH_STATES.SCHEDULED.value ? (
            <Tab value="1" label="Schedule" />
          ) : (
            <Tab value="2" label="Share/Save" />
          )}
          <Tab value="3" label="Map Bans" />
          <Tab value="4" label="Scoreboard" />
        </TabList>
        {item?.status !== MATCH_STATES.SCHEDULED.value ? (
          <TabPanel value="1">
            <MatchSchedule matchTime={matchTime} setMatchTime={setMatchTime} item={item} />
          </TabPanel>
        ) : (
          <>
            <TabPanel value="2">
              <MatchShare matchTime={matchTime} onComplete={onNext} />
            </TabPanel>
            <TabPanel value="3">
              <MapBans item={item} />
            </TabPanel>
            <TabPanel value="4">
              <MatchScoreBoard item={item} onComplete={onNext} />
            </TabPanel>
          </>
        )}
      </TabContext>
    </Container>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
