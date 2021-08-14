import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Layout } from "./components";
import { AuthContextProvider } from "./auth";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
	return (
		<AuthContextProvider>
			<ChakraProvider>
				<Router>
					<Layout />
				</Router>
			</ChakraProvider>
		</AuthContextProvider>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
