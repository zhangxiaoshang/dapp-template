import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Settings } from "@/context/settings-context";
import { createThemeOptions } from "./theme-options";
import overrides from "./overrides";

export function ThemeComponent(
  props: React.PropsWithChildren<{ settings: Settings }>
) {
  const { settings, children } = props;

  // 1. themeOptions
  const themeOptions = createThemeOptions(settings);

  // 2. createTheme
  let theme = createTheme(themeOptions);

  // 3. components overrides
  theme = createTheme(theme, {
    components: { ...overrides(theme) },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
