import { useState, createContext, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { themeCreator } from "./base";
import { StylesProvider } from "@mui/styles";
import { defaultDarkTheme } from "./schemes/dark";

export const ThemeContext = createContext((_themeName) => {});

const ThemeProviderWrapper = (props) => {
  const [themeName, _setThemeName] = useState("dark");
  // const [theme, _setTheme] = useState({});

  useEffect(() => {
    let curThemeName = window.localStorage.getItem("appTheme") || "dark";
    if (curThemeName != "dark") curThemeName = "light";
    _setThemeName(curThemeName);
  }, []);

  // useEffect(() => {
  //   _setTheme(themeCreator(themeName));
  // }, [themeName]);

  const theme = themeCreator(themeName);
  const setThemeName = (themeName) => {
    window.localStorage.setItem("appTheme", themeName);
    _setThemeName(themeName);
  };

  // const setTheme = (newTheme) => {
  //   _setTheme({
  //     ...defaultDarkTheme,
  //     ...newTheme,
  //   });
  // };

  // const setThemePrimaryColor = (color) => {
  //   _setTheme({
  //     ...defaultDarkTheme,
  //     palette: {
  //       ...defaultDarkTheme.palette,
  //       primary: {
  //         main: color,
  //       },
  //     },
  //   });
  // };

  return (
    <StylesProvider injectFirst>
      <ThemeContext.Provider value={{ setThemeName, themeName }}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </ThemeContext.Provider>
    </StylesProvider>
  );
};

export default ThemeProviderWrapper;
