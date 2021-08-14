import { createContext } from "react";
import { AuthContext } from "./types";

export const authContext = createContext<AuthContext>({
	userIsLoggedIn: false,
	user: undefined,
	logIn: () => {},
	logOut: () => {},
	createUser: () => {},
	updateUser: () => {},
	destroyUser: () => {},
});
