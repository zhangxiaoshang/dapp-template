import { PaletteMode } from "@mui/material";
import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Settings = {
  mode: PaletteMode;
};

export type SettingsContextValue = {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
};

const initialSettings: Settings = {
  mode: "light",
};

// Crewate Context
export const SettingsContext = createContext<SettingsContextValue>({
  settings: initialSettings,
  setSettings: () => null,
});

// Provider
export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>({ ...initialSettings });

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

// Consumer
export const SettingsConsumer = SettingsContext.Consumer;
