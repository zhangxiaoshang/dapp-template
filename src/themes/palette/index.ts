// ** Type Imports
import { PaletteMode } from "@mui/material";

const DefaultPalette = (mode: PaletteMode) => {
  // ** Vars
  const lightColor = "58, 53, 65";
  const darkColor = "231, 227, 252";
  const mainColor = mode === "light" ? lightColor : darkColor;

  return {
    mode: mode,
    primary: {
      light: "#9E69FD",
      main: "#9155FD",
      dark: "#804BDF",
      contrastText: "#FFF",
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`,
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === "light" ? "#FFF" : "#312D4B",
      default: mode === "light" ? "#F4F5FA" : "#28243D",
    },
  };
};

export default DefaultPalette;
