import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundry, Layout } from "./components";
import { AuthContextProvider } from "./auth";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
	return (
		<ErrorBoundry>
			<AuthContextProvider>
				<ChakraProvider>
					<Router>
						<Layout />
					</Router>
				</ChakraProvider>
			</AuthContextProvider>
		</ErrorBoundry>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
