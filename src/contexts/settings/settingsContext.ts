import { createContext } from "react";
import { SettingsContext } from "./types";

export const settingsContext = createContext<SettingsContext>({
	mode: "dark",
	theme: "default",
	timers: [],
	toggleMode: () => {
		throw new Error("Cannot be called without parent SettingsContextProvider");
	},
	updateTheme: () => {
		throw new Error("Cannot be called without parent SettingsContextProvider");
	},
	createTimer: () => {
		throw new Error("Cannot be called without parent SettingsContextProvider");
	},
	destroyTimer: () => {
		throw new Error("Cannot be called without parent SettingsContextProvider");
	},
});
