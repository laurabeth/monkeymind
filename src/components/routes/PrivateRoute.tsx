import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks";

const PrivateRoutes: FC = ({ children }) => {
	const authContext = useAuthContext();
	const history = useHistory();

	useEffect(() => {
		if (!authContext.userIsLoggedIn) {
			history.push("/auth");
		}
	}, [history, authContext]);

	return <>{authContext.userIsLoggedIn ? children : <></>}</>;
};

export { PrivateRoutes };
