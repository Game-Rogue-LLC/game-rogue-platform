import { ButtonBase, Typography } from "@mui/material";

import { Add } from "@mui/icons-material";

export default function AddCollabTool({ onClick }) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: 66,
        height: 66,
        cursor: "pointer",
        borderRadius: 1,
        flexDirection: "column",
        alignItems: "center",
        ":hover": { backgroundColor: "rgba(255,255,255,.2)" }
      }}
    >
      <Add />
      <Typography variant="body2">Add a collab</Typography>
    </ButtonBase>
  );
}
