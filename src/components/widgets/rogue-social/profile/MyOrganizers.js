import { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "@/src/context/app";
import { useTournamentContext } from "@/src/context/TournamentContext";
import dayjs from "dayjs";
import { useAuthContext } from "@/src/context/AuthContext";
import { isMyorganization } from "@/src/utils/utils";
import OrganizationItem from "@/src/components/widgets/rogue-social/profile/OrganizationItem";

const MyOrganizers = () => {
  const { setTitle } = useAppContext();
  const { user } = useAuthContext();
  const { organization } = useTournamentContext();

  const myOrganizers = useMemo(() => {
    if (organization?.organizations) {
      const res = Object.keys(organization.organizations)
        // .filter((key) => isMyorganization(organization.organizations[key], user.id))
        .map((key) => organization.organizations[key]);
      return res;
    }
    return [];
  }, [organization?.organizations]);

  useEffect(() => {
    setTitle("MY ORGANIZERS");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}
    >
      {myOrganizers.map((item) => (
        <OrganizationItem key={"organization_" + item.id} organization={item} disableLink={true} />
      ))}
    </Box>
  );
};

export default MyOrganizers;
