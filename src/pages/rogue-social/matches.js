import { useEffect, useState } from "react";
import { Box, Container, Tab, Tabs, Typography, styled } from "@mui/material";
import PublicLayout from "@/src/content/PublicLayout";
import MatchList from "@/src/components/widgets/rogue-social/MatchList";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Container sx={{ py: 5 }}>
      <MatchList />
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
