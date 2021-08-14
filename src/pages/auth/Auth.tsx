import React, { FC, useState } from "react";
import {
	Button,
	Center,
	FormControl,
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
	Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Auth: FC = () => {
	const [showPw, setShowPw] = useState<boolean>(false);

	return (
		<Center padding="20vmin">
			<FormControl>
				<Stack>
					<Input type="text" placeholder="Username" />
					<InputGroup>
						<Input type={showPw ? "text" : "password"} placeholder="Password" />
						<InputRightElement>
							<IconButton
								aria-label={showPw ? "hide password" : "show password"}
								onClick={() => setShowPw((prev) => !prev)}
								icon={showPw ? <ViewOffIcon /> : <ViewIcon />}
							/>
						</InputRightElement>
					</InputGroup>
					<Button>Log In</Button>
				</Stack>
			</FormControl>
		</Center>
	);
};

export { Auth };
