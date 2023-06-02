import { ThemeProvider, createTheme } from "@mui/material";
import { createContext, useCallback, useEffect, useState } from "react";

import { StylesProvider } from "@mui/styles";
import { defaultDarkTheme } from "./schemes/dark";
import { themeCreator } from "./base";

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

  // useEffect(() => {
  //   changeThemeByName();
  // }, [changeThemeByName]);

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
  //   _setTheme(
  //     createTheme({
  //       ...defaultDarkTheme,
  //       palette: {
  //         ...defaultDarkTheme.palette,
  //         primary: {
  //           main: color,
  //         },
  //       },
  //     })
  //   );
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
