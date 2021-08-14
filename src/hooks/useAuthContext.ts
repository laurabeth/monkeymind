import { useContext } from "react";
import { authContext } from "../auth/authContext";
import { AuthContext } from "../auth/types";

export const useAuthContext = () => {
	const context = useContext<AuthContext>(authContext);
	return context;
};
