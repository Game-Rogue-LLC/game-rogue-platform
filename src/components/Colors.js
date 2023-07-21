import { Box, Button, Grid, InputLabel } from "@mui/material";

import ColorSelect from "@/src/components/dropdown/ColorSelect";

const Colors = ({ colors, onColorChange, sx }) => {
  return (
    <Grid container spacing={2} sx={sx}>
      <Grid item xs={12} lg={4}>
        <InputLabel sx={{ color: "white" }}>Primary</InputLabel>
        <ColorSelect
          name="primary"
          label="Primary"
          value={colors.primary}
          onChange={(val) => onColorChange("primary", val)}
          sx={{ mt: 1 }}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <InputLabel sx={{ color: "white" }}>Secondary</InputLabel>
        <ColorSelect
          name="secondary"
          label="Secondary"
          value={colors.secondary}
          onChange={(val) => onColorChange("secondary", val)}
          sx={{ mt: 1 }}
        />
      </Grid>
      <Grid item xs={12} lg={4}>
        <InputLabel sx={{ color: "white" }}>Tertiary</InputLabel>
        <ColorSelect
          name="tertiary"
          label="Tertiary"
          value={colors.tertiary}
          onChange={(val) => onColorChange("tertiary", val)}
          sx={{ mt: 1 }}
        />
      </Grid>
      {/* <Grid item xs={12}>
        <InputLabel>Preview</InputLabel>
        <Box sx={{ mt: 1 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.primary,
              ":hover": { backgroundColor: colors.secondary },
            }}
          >
            Button
          </Button>
        </Box>
      </Grid> */}
    </Grid>
  );
};

export default Colors;
