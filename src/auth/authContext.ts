import { createContext } from "react";
import { AuthContext } from "./types";

export const authContext = createContext<AuthContext>({
	userIsLoggedIn: false,
	user: undefined,
	logIn: () => {
		throw new Error("Cannot be called without parent AuthContextProvider");
	},
	logOut: () => {
		throw new Error("Cannot be called without parent AuthContextProvider");
	},
	createUser: () => {
		throw new Error("Cannot be called without parent AuthContextProvider");
	},
	updateUser: () => {
		throw new Error("Cannot be called without parent AuthContextProvider");
	},
	destroyUser: () => {
		throw new Error("Cannot be called without parent AuthContextProvider");
	},
});
