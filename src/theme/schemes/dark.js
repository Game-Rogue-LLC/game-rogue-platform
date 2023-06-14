import "@mui/lab/themeAugmentation";

import { alpha, createTheme, darken } from "@mui/material";

export const defaultDarkTheme = {
  palette: {
    mode: "dark",
    primary: {
      bright: "",
      main: "#f5831f"
    },
    secondary: {
      main: "#440f06",
      bright: "#4d2400"
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
      fontFamily: "Industry",
      color: "white"
    },
    h2: {
      fontFamily: "Industry",
      color: "white"
    },
    h3: {
      fontFamily: "Industry",
      color: "white"
    },
    h4: {
      fontFamily: "Industry",
      color: "white"
    },
    h5: {
      fontFamily: "ProximaNovaRegular",
      color: "white"
    },
    h6: {
      fontFamily: "ProximaNovaRegular",
      color: "white"
    },
    label: {
      fontFamily: "ProximaNovaRegular",
      color: "white"
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
