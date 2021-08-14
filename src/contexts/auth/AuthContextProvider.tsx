import React, { FC, useCallback, useState } from "react";
import { authContext } from "./authContext";
import { User } from "./types";

const AuthContextProvider: FC = ({ children }) => {
	const [user, setUser] = useState<User | undefined>();
	const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

	const logIn = useCallback(
		(u: User): void => {
			setUserIsLoggedIn(true);
			setUser(u);
		},
		[setUserIsLoggedIn],
	);

	const logOut = useCallback((): void => {
		setUserIsLoggedIn(false);
		setUser(undefined);
	}, [setUserIsLoggedIn]);

	const createUser = useCallback(() => {
		throw new Error("Not implemented");
	}, []);
	const updateUser = useCallback(() => {
		throw new Error("Not implemented");
	}, []);
	const destroyUser = useCallback(() => {
		throw new Error("Not implemented");
	}, []);

	return (
		<authContext.Provider
			value={{
				user,
				userIsLoggedIn,
				logIn,
				logOut,
				createUser,
				updateUser,
				destroyUser,
			}}>
			{children}
		</authContext.Provider>
	);
};

export { AuthContextProvider };
