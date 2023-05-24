import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import _ from "lodash";

import AdminLayout from "@/src/content/AdminLayout";
import { useAppContext } from "@/src/context/app";
import DatePicker from "@/src/components/datetime/DatePicker";
import { useMatchContext } from "@/src/context/MatchContext";
import TournamentProvider, {
  useTournamentContext,
} from "@/src/context/TournamentContext";
import { useStyleContext } from "@/src/context/StyleContext";
import PublicLayout from "@/src/content/PublicLayout";
import MatchSchedule from "@/src/components/widgets/rogue-social/MatchSchedule";
import MatchShare from "@/src/components/widgets/rogue-social/MatchShare";
import MapBans from "@/src/components/widgets/rogue-social/MapBans";
import MatchScoreBoard from "@/src/components/widgets/rogue-social/MatchScoreBoard";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors, buttonStyle } = useStyleContext();
  const { organization, event, team, match, matchLoading } =
    useTournamentContext();
  const [tab, setTab] = useState("1");
  const [mid, setMID] = useState(router?.query?.mid);
  const [item, setItem] = useState(null);
  const [step, setStep] = useState(0);
  const [matchTime, setMatchTime] = useState(new Date());

  useEffect(() => {
    if (router?.query?.id && router.query.id !== mid) {
      setMID(router.query.id);
    }
  }, [router]);

  useEffect(() => {
    if (match?.matches) {
      setItem(match.matches.find((val) => val.id === mid));
    }
  }, [match?.matches, mid]);

  useEffect(() => {
    if (item?.step) setStep(item.step);
  }, [item]);

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
          <Tab value="1" label="Schedule" />
          <Tab value="2" label="Share/Save" />
          <Tab value="3" label="Map Bans" />
          <Tab value="4" label="Scoreboard" />
        </TabList>
        <TabPanel value="1">
          <MatchSchedule
            matchTime={matchTime}
            setMatchTime={setMatchTime}
            item={item}
          />
        </TabPanel>
        <TabPanel value="2">
          <MatchShare matchTime={matchTime} onComplete={onNext} />
        </TabPanel>
        <TabPanel value="3">
          <MapBans item={item} onComplete={onNext} />
        </TabPanel>
        <TabPanel value="4">
          <MatchScoreBoard item={item} onComplete={onNext} />
        </TabPanel>
      </TabContext>
    </Container>
  );
  // return (
  //   <Container sx={{ padding: 2 }}>
  //     {step === 0 ? (
  //       <MatchSchedule
  //         matchTime={matchTime}
  //         setMatchTime={setMatchTime}
  //         item={item}
  //         onComplete={onNext}
  //       />
  //     ) : (
  //       <MatchShare matchTime={matchTime} onComplete={onNext} />
  //     )}
  //     <Box
  //       sx={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "space-between",
  //         marginTop: 10,
  //       }}
  //     >
  //       <Button
  //         variant="contained"
  //         disabled={step === 0}
  //         onClick={onPrevBtnClick}
  //       >
  //         Prev
  //       </Button>
  //       <Button
  //         variant="contained"
  //         disabled={step === 9999}
  //         onClick={onNextBtnClick}
  //       >
  //         Next
  //       </Button>
  //     </Box>
  //   </Container>
  // );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
