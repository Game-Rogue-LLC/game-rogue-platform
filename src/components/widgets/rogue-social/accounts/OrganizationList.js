import { Box, Button } from "@mui/material";
import { useEffect, useMemo } from "react";

import { ORGANIZATION_PROFILE_LIMIT } from "@/src/config/global";
import OrganizationItem from "@/src/components/widgets/rogue-social/accounts/OrganizationItem";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const OrganizationList = ({ items }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}
    >
      {items.length > 0 &&
        items.map((item) => (
          <OrganizationItem
            key={"organization_" + item.id}
            organization={item}
            disableLink={true}
          />
        ))}
      {items.length < ORGANIZATION_PROFILE_LIMIT && (
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

export default OrganizationList;
