import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Auth, Home } from "../../pages";
import { PrivateRoutes } from "./PrivateRoute";

const Routes: FC = () => {
	return (
		<Switch>
			<Route path="/auth" component={Auth} />
			<PrivateRoutes>
				<Route exact path="/" component={Home} />
			</PrivateRoutes>
		</Switch>
	);
};

export { Routes };
