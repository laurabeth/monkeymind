import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { Auth, Home } from "../../pages";

const Routes: FC = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/auth" component={Auth} />
		</Switch>
	);
};

export { Routes };
