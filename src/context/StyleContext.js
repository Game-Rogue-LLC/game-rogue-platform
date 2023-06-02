import {
  brighterColor,
  hoverColor as getHoverColor,
  isBrightColor,
  withOpacity,
} from "@/src/utils/utils";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { ThemeContext } from "@/src//theme/ThemeProvider";

const initialColors = {
  primary: "#f5851f",
  secondary: "#ab5a15",
  tertiary: "#f5851f",
};

const StyleContext = createContext({});

export const useStyleContext = () => useContext(StyleContext);

const StyleProvider = ({ children }) => {
  // const { setThemePrimaryColor } = useContext(ThemeContext);
  const [colors, setColors] = useState(initialColors);

  const buttonStyle = useMemo(() => {
    const hoverColor = getHoverColor(colors.primary),
      isBright = isBrightColor(colors.primary);
    return {
      backgroundColor: colors.primary,
      color: isBright ? "black" : "white",
      "&:hover": {
        color: isBright ? "black" : "white",
        backgroundColor: hoverColor,
      },
    };
  }, [colors.primary]);

  const primaryFontColor = useMemo(() => {
    if (isBrightColor(colors.primary)) return "black";
    return "white";
  }, [colors.primary]);

  const secondaryFontColor = useMemo(() => {
    if (isBrightColor(colors.secondary)) return "black";
    return "white";
  }, [colors.secondary]);

  const primaryBackgroundColor = useMemo(() => {
    return withOpacity(colors.primary, 0.7);
  }, [colors.primary]);

  const secondaryBackgroundColor = useMemo(() => {
    return withOpacity(colors.secondary, 0.5);
  }, [colors.secondary]);

  // const changeTheme = useCallback(() => {
  //   setThemePrimaryColor(colors.primary);
  // }, [colors.primary]);

  // useEffect(() => {
  //   changeTheme();
  // }, [changeTheme]);

  return (
    <StyleContext.Provider
      value={{
        colors,
        setColors,
        buttonStyle,
        primaryFontColor,
        secondaryFontColor,
        primaryBackgroundColor,
        secondaryBackgroundColor,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export default StyleProvider;
