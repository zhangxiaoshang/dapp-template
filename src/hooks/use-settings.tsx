import { useContext } from "react";
import {
  SettingsContext,
  SettingsContextValue,
} from "@/context/settings-context";

export const useSettings = (): SettingsContextValue =>
  useContext(SettingsContext);
