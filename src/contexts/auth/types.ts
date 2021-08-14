export interface User {
	id: string;
	username: string;
}

export interface AuthContext {
	userIsLoggedIn: boolean;
	user: User | undefined;
	logIn: (u: User) => void;
	logOut: () => void;
	createUser: () => void;
	updateUser: () => void;
	destroyUser: () => void;
}
