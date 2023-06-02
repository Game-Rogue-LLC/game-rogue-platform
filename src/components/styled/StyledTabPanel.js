import { Box } from "@mui/material";

export function tabProps(name) {
  return {
    id: `${name}-tab`,
    "aria-controls": `${name}-tabpanel`,
  };
}

export default function StyledTabPanel({
  name,
  children,
  tab,
  value,
  index,
  ...other
}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== tab}
      id={`${name}-tabpanel`}
      aria-labelledby={`${name}-tab`}
      {...other}
    >
      {value === tab && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
