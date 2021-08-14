import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../../hooks";

const PrivateRoutes: FC = ({ children }) => {
	const { userIsLoggedIn } = useAuthContext();
	const history = useHistory();

	useEffect(() => {
		if (!userIsLoggedIn) {
			history.push("/auth");
		}
	}, [history, userIsLoggedIn]);

	return <>{userIsLoggedIn ? children : <></>}</>;
};

export { PrivateRoutes };
