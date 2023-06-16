import { Box, Button } from "@mui/material";
import { useEffect, useMemo } from "react";

import { ORGANIZATION_PROFILE_LIMIT } from "@/src/config/global";
import OrganizationItem from "@/src/components/widgets/rogue-social/accounts/OrganizationItem";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Organizations = ({ isMainPage }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { organization } = useTournamentContext();

  const myOrganizers = useMemo(() => {
    if (organization?.organizations) {
      return _.filter(organization.organizations, (val) => val.uid === user.id);
    }
    return [];
  }, [organization?.organizations]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}
    >
      {myOrganizers.length > 0
        ? myOrganizers.map((item) => (
            <OrganizationItem
              key={"organization_" + item.id}
              organization={item}
              disableLink={true}
            />
          ))
        : isMainPage === false && (
            <Button
              variant="contained"
              onClick={() => {
                router.push("/rogue-social/manage-accounts");
              }}
            >
              {isMainPage === true ? "CREATE NEW ACCOUNT" : "GO TO MANAGE ACCOUNTS PAGE"}
            </Button>
          )}
      {isMainPage === true && myOrganizers.length < ORGANIZATION_PROFILE_LIMIT && (
        <Button
          variant="contained"
          onClick={() => {
            router.push("/organization/create");
          }}
        >
          CREATE NEW ACCOUNT
        </Button>
      )}
    </Box>
  );
};

export default Organizations;
