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
	Heading,
	Container,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuthContext } from "../../hooks";
import { useHistory } from "react-router-dom";

const Auth: FC = () => {
	const [showPw, setShowPw] = useState<boolean>(false);
	const { logIn } = useAuthContext();
	const history = useHistory();
	const handleLogIn = () => {
		logIn({ id: "0", username: "dev", email: "dev@mm.com" });
		history.push("/dashboard");
	};

	return (
		<Container>
			<Center>
				<Heading padding="20">🙈🙉🙊</Heading>
			</Center>
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
					<Button onClick={handleLogIn}>Log In</Button>
				</Stack>
			</FormControl>
		</Container>
	);
};

export { Auth };
