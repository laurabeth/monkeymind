export interface Timer {
	startTime: string;
	endTime: string;
	totalSeconds: number;
	label: string;
	repeat: string;
	id: string;
}

export interface SettingsContext {
	mode: "dark" | "light";
	theme: "default";
	timers: Timer[];
	toggleMode: () => void;
	updateTheme: () => void;
	createTimer: (t: Timer) => boolean;
	destroyTimer: (id: string) => boolean;
}
