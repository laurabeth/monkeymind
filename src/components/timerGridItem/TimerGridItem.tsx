import { RepeatClockIcon } from "@chakra-ui/icons";
import { IconButton, Square } from "@chakra-ui/react";
import React, { FC } from "react";
import { Timer } from "../../contexts";

interface TimerGridItemProps {
	timer: Timer;
}

const TimerGridItem: FC<TimerGridItemProps> = ({ timer }) => {
	return (
		<Square>
			<IconButton
				aria-label={`open named timer: ${timer.label}`}
				size="lg"
				icon={<RepeatClockIcon />}
			/>
		</Square>
	);
};

export { TimerGridItem };
