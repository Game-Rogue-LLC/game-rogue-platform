import { Paper, useTheme } from "@mui/material";

import AdminLayout from "@/src/content/AdminLayout";
import OrganizerCreateForm from "@/src/components/widgets/organizer/OrganizerCreateForm";
import { useAppContext } from "@/src/context/app";
import { useEffect } from "react";

// import ColorPicker from "@mapbox/react-colorpickr";

const Page = (props) => {
  const theme = useTheme();
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("REGISTER AN ORGANIZER");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <OrganizerCreateForm />
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
