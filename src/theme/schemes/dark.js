import { alpha, createTheme, darken } from "@mui/material";
import "@mui/lab/themeAugmentation";

export const defaultDarkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#f5831f"
    },
    secondary: {
      main: "#440f06"
    },
    card: {
      main: "#180e05",
      darker: "#180e05"
    },
    backgroundColor: {
      header: "#28180a"
    },
    action: {
      selectedOpacity: 0.1
    }
  },
  typography: {
    color: "white",
    fontFamily: "ProximaNovaRegular, Industry",
    h1: {
      fontFamily: "Industry"
    },
    h2: {
      fontFamily: "Industry"
    },
    h3: {
      fontFamily: "Industry"
    },
    h4: {
      fontFamily: "Industry"
    },
    h5: {
      fontFamily: "ProximaNovaRegular"
    },
    h6: {
      fontFamily: "ProximaNovaRegular"
    },
    label: {
      fontFamily: "ProximaNovaRegular"
    },
    subtitle2: {
      color: "gray"
    }
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none"
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#CCCACA"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#180e05"
        }
      }
    }
  }
};

export default createTheme(defaultDarkTheme);
