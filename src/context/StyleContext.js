import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { brighterColor, isBrightColor } from "@/src/utils/utils";

const initialColors = {
  primary: "#f5851f",
  secondary: "#ab5a15",
  tertiary: "#f5851f",
};

const StyleContext = createContext({});

export const useStyleContext = () => useContext(StyleContext);

const StyleProvider = ({ children }) => {
  const [colors, setColors] = useState(initialColors);

  const buttonStyle = useMemo(() => {
    const hoverColor = brighterColor(colors.primary, 0.1),
      isBright = isBrightColor(colors.primary);
    return {
      backgroundColor: colors.primary,
      color: isBright ? "black" : "white",
      "&:hover": {
        color: isBright ? "black" : "white",
        backgroundColor: "#" + hoverColor,
      },
    };
  }, [colors.primary]);

  return (
    <StyleContext.Provider value={{ colors, setColors, buttonStyle }}>
      {children}
    </StyleContext.Provider>
  );
};

export default StyleProvider;
