import { useContext } from "react";
import { settingsContext, SettingsContext } from "../contexts";

export const useSettingsContext = () => {
	const context = useContext<SettingsContext>(settingsContext);
	return context;
};
