import { Settings } from "@/context/settings-context";
import { ThemeOptions } from "@mui/material";
import palette from "./palette";

export function createThemeOptions(settins: Settings): ThemeOptions {
  const { mode } = settins;

  const themeOptions: ThemeOptions = {
    palette: palette(mode),
  };

  return themeOptions;
}
