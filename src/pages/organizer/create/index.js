import { Paper, useTheme } from "@mui/material";

import AdminLayout from "@/src/content/AdminLayout";
import OrganizationCreateForm from "@/src/components/widgets/organizer/OrganizerCreateForm";
import { useAppContext } from "@/src/context/app";
// import ColorPicker from "@mapbox/react-colorpickr";
import { useEffect } from "react";

const Page = (props) => {
  const theme = useTheme();
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("REGISTER AN ORGANIZER");
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
