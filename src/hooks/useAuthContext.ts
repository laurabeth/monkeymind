import { useContext } from "react";
import { authContext } from "../contexts/auth/authContext";
import { AuthContext } from "../contexts/auth/types";

export const useAuthContext = () => {
	const context = useContext<AuthContext>(authContext);
	return context;
};
