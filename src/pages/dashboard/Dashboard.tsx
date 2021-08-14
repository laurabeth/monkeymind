import React, { FC } from "react";
import { Center, IconButton, SimpleGrid } from "@chakra-ui/react";
import { useSettingsContext } from "../../hooks";
import { TimerGridItem } from "../../components";
import { PlusSquareIcon } from "@chakra-ui/icons";

const Dashboard: FC = () => {
	const { timers } = useSettingsContext();
	// check for existing timers
	// if timers, display all
	// if none, prompt timer setup
	return (
		<Center>
			{timers.length > 0 && (
				<SimpleGrid>
					{timers.map((timer) => (
						<TimerGridItem timer={timer} />
					))}
				</SimpleGrid>
			)}
			{timers.length === 0 && (
				<IconButton aria-label="create timer" icon={<PlusSquareIcon />} />
			)}
		</Center>
	);
};

export { Dashboard };
