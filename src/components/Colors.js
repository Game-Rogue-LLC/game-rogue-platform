import { Box, Button, Grid, InputLabel, Typography, useTheme } from "@mui/material";

import ColorSelect from "@/src/components/dropdown/ColorSelect";

const Colors = ({ colors, onColorChange, sx }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={2} sx={sx}>
      <Grid item xs={12}>
        <Typography variant="h6">
          {"Event Branding "}
          <span style={{ color: theme.palette.primary.main, fontSize: 16 }}>
            It is highly recommended that each color is different.
          </span>
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div>
          <InputLabel sx={{ color: "white" }}>Primary</InputLabel>
          <Typography variant="subtitle2">
            This changes the color of your event card's border, event title, button colors, and
            content block titles.
          </Typography>
        </div>
        <ColorSelect
          name="primary"
          label="Primary"
          value={colors.primary}
          onChange={(val) => onColorChange("primary", val)}
          sx={{ mt: 1 }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div>
          <InputLabel sx={{ color: "white" }}>Secondary</InputLabel>
          <Typography variant="subtitle2">
            This changes the color of the event graphic border, text inside content blocks, text
            inside event cards, text inside buttons, and text inside drop-down menus.
          </Typography>
        </div>
        <ColorSelect
          name="secondary"
          label="Secondary"
          value={colors.secondary}
          onChange={(val) => onColorChange("secondary", val)}
          sx={{ mt: 1 }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <div>
          <InputLabel sx={{ color: "white" }}>Tertiary</InputLabel>
          <Typography variant="subtitle2">
            This changes the background of event pages, the background of event cards, and the
            background of drop-down menus.
          </Typography>
        </div>
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
