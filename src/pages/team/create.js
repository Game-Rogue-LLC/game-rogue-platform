import { Paper, useTheme } from "@mui/material";

import AdminLayout from "@/src/content/AdminLayout";
import TeamCreateForm from "@/src/components/widgets/team/TeamCreateForm";
import { useAppContext } from "@/src/context/app";
import { useEffect } from "react";

const Page = (props) => {
  const theme = useTheme();
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("REGISTER A TEAM");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <TeamCreateForm />
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
