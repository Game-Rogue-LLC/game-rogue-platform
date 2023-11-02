import { Paper, useTheme } from "@mui/material";

import AdminLayout from "@/src/content/AdminLayout";
import OrganizationCreateForm from "@/src/components/widgets/organization/OrganizationCreateForm";
import { useAppContext } from "@/src/context/app";
import { useEffect } from "react";

// import ColorPicker from "@mapbox/react-colorpickr";

const Page = (props) => {
  const theme = useTheme();
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("REGISTER AN ORGANIZATION");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <OrganizationCreateForm />
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
