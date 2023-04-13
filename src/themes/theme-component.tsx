import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Settings } from "@/context/settings-context";
import { createThemeOptions } from "./create-theme-options";

export function ThemeComponent(
  props: React.PropsWithChildren<{ settings: Settings }>
) {
  const { settings, children } = props;

  // 1. themeOptions
  const themeOptions = createThemeOptions(settings);

  // 2. createTheme
  const theme = createTheme(themeOptions);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
