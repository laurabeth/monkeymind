import React, { FC, useCallback, useState } from "react";
import { settingsContext } from "./settingsContext";
import { Timer } from "./types";

const SettingsContextProvider: FC = ({ children }) => {
	const [mode, setMode] = useState<"dark" | "light">("dark");
	const [theme, setTheme] = useState<"default">("default");
	const [timers, setTimers] = useState<Timer[]>([]);

	const toggleMode = useCallback(() => {
		throw new Error("Not implemented");
	}, []);
	const updateTheme = useCallback(() => {
		throw new Error("Not implemented");
	}, []);
	const createTimer = useCallback(() => {
		throw new Error("Not implemented");
	}, []);
	const destroyTimer = useCallback(() => {
		throw new Error("Not implemented");
	}, []);

	return (
		<settingsContext.Provider
			value={{
				mode,
				theme,
				timers,
				toggleMode,
				updateTheme,
				createTimer,
				destroyTimer,
			}}>
			{children}
		</settingsContext.Provider>
	);
};

export { SettingsContextProvider };
