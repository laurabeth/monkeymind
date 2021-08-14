import { useContext } from "react";
import { authContext, AuthContext } from "../contexts";

export const useAuthContext = () => {
	const context = useContext<AuthContext>(authContext);
	return context;
};
