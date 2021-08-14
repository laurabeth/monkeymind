import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Auth, Dashboard, Home } from "../../pages";
import { PrivateRoutes } from "./PrivateRoute";

const Routes: FC = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/auth" component={Auth} />
			<PrivateRoutes>
				<Route path="/dashboard" component={Dashboard} />
			</PrivateRoutes>
		</Switch>
	);
};

export { Routes };
