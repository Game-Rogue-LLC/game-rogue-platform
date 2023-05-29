import team from "@/lib/firestore/collections/team";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatNumber } from "@/src/utils/utils";
import { Container, Grid, Skeleton, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomButton from "@/src/components/button/CustomButton";

const Page = (props) => {
  const router = useRouter();
  const { team } = useTournamentContext();
  const [tid, setTID] = useState(router?.query?.tid);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (router?.query?.tid && router.query.tid != tid) setTID(router.query.tid);
  }, [router?.query]);

  useEffect(() => {
    console.log(tid);
    if (team?.teams && team.teams[tid]) {
      setItem(team.teams[tid]);
    }
  }, [tid]);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12} lg={8} container spacing={2} rowSpacing={2}>
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} lg="100px">
              {item?.darkLogo ? (
                <Image src={item.darkLogo} alt={item.darkLogo} width={85} height={85} />
              ) : (
                <Skeleton variant="rectangular" width={85} height={85} />
              )}
              <CustomButton>Rogue Social</CustomButton>
              <Typography variant="h5">{item?.name}</Typography>
              <Typography variant="h5">GR Rating: {formatNumber(Math.random() * 10, 1)}</Typography>
            </Grid>
            <Grid item xs={12} lg></Grid>
          </Grid>
          <Grid item xs={12}></Grid>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
      </Grid>
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
