import { ButtonBase, SvgIcon, Typography } from "@mui/material";

import { Dataset } from "@mui/icons-material";

export default function ContentsBlockTool({ onClick }) {
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
      <Dataset />
      <Typography variant="body2">Contents Block</Typography>
    </ButtonBase>
  );
}
