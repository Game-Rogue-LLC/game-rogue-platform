import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_DARK_LOGO } from "@/src/config/global";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import StyledTabPanel, { tabProps } from "@/src/components/styled/StyledTabPanel";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import EventCoursePublic from "@/src/components/widgets/event/EventCoursePublic";
import EventInfoPublic from "@/src/components/widgets/event/EventInfoPublic";
import Link from "next/link";
import Policies from "@/src/components/widgets/event/Policies";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import TeamTable from "@/src/components/table/TeamTable";
import dayjs from "dayjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import Stripe from "stripe";
import { enqueueSnackbar } from "notistack";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-03-02',
});

const Page = (props) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organizer, event, team } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.eid);
  const [isRegistering, setIsRegistering] = useState(true);

  console.log(router);

  useEffect(() => {
    setTitle("EVENT INFO");
  });

  useEffect(() => {
    if (router?.query?.session_id) {
      const { session_id, eid, tid } = router.query;
      if (event.events[eid].participants.length < event.events[eid].participantsCount) {
        stripe.checkout.sessions.retrieve(session_id).then((session) => {
          if (session.status == 'complete' && session.payment_status == 'paid') {
            let newParticipants = [];
            if (event.events[eid]?.participants) newParticipants = event.events[eid].participants;
            newParticipants = [
              ...newParticipants,
              {
                id: tid,
                score: 0,
                wins: 0,
                loses: 0,
                draws: 0,
                deleted: false,
                createdAt: new Date(),
                registeredAt: new Date()
              }
            ];
            
            event.update(eid, {
              ...event.events[eid],
              participants: newParticipants
            }).then((res) => {
              if (res.code === 'succeed') {
                enqueueSnackbar("Registered successfully!", { variant: "success" });
                router.push(`/event/${eid}`);
              }
            });
          } else {
            enqueueSnackbar("Payment failed!", { variant: "error" });
          }
        }).catch((err) => {
          enqueueSnackbar("Something went wrong!", { variant: "error" });
          console.warn(err);
        })
      }
    }
  }, [router, event?.events]);

  return <Box sx={{ width: "100%", height: "500px", display: "flex", flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center", backgroundColor: "black" }}>
    <CircularProgress color="primary" />
    <Typography variant="h6" sx={{ fontSize: 18 }}>
      Registering...
    </Typography>
  </Box>
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
