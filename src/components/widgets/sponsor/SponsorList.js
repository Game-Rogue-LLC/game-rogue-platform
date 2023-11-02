import { Box, Button } from "@mui/material";

import SponsorItem from "./SponsorItem";
import { useRouter } from "next/router";

const OrganizationList = ({ items }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}
    >
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <SponsorItem key={"sponsor_" + item.id} item={item} />
        ))}
      {items && items.length === 0 && (
        <Button
          variant="contained"
          onClick={() => {
            router.push("/sponsor/create");
          }}
        >
          CREATE NEW ACCOUNT
        </Button>
      )}
    </Box>
  );
};

export default OrganizationList;
