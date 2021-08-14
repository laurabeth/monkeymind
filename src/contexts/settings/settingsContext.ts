import { createContext } from "react";
import { SettingsContext, Timer } from "./types";

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
	createTimer: (t: Timer) => {
		throw new Error("Cannot be called without parent SettingsContextProvider");
	},
	destroyTimer: (id: string) => {
		throw new Error("Cannot be called without parent SettingsContextProvider");
	},
});
