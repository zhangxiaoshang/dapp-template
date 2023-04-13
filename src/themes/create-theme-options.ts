import { Settings } from "@/context/settings-context";
import { ThemeOptions } from "@mui/material";
import { palette as paletteLight } from "./light/palette";
import { palette as paletteDark } from "./dark/palette";

export function createThemeOptions(settins: Settings): ThemeOptions {
  const { mode } = settins;

  const themeOptions: ThemeOptions = {
    palette: mode === "dark" ? paletteDark : paletteLight,
  };

  return themeOptions;
}
