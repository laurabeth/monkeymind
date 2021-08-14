import React, { FC, useCallback, useState } from "react";
import { settingsContext } from "./settingsContext";
import { Timer } from "./types";

const SettingsContextProvider: FC = ({ children }) => {
	const [mode, setMode] = useState<"dark" | "light">("dark");
	const [theme] = useState<"default">("default");
	const [timers, setTimers] = useState<Timer[]>([]);

	const toggleMode = useCallback(() => {
		setMode((prev) => {
			if (prev === "dark") return "light";
			return "dark";
		});
	}, [setMode]);

	const updateTheme = useCallback(() => {
		throw new Error("Not implemented");
	}, []);

	// TODO: Implement with local or remote storage
	const createTimer = useCallback(
		(t: Timer): boolean => {
			setTimers([...timers, t]);
			return true;
		},
		[setTimers],
	);

	// TODO: Implement with local or remote storage
	const destroyTimer = useCallback(
		(id: string) => {
			let status = false;
			setTimers((prev) => {
				const filtered = prev.filter((t) => id !== t.id);
				status = filtered.length < prev.length;
				return filtered;
			});
			return status;
		},
		[setTimers],
	);

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
