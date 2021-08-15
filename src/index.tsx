import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary, Layout } from "./components";
import {
	AuthContextProvider,
	DataContextProvider,
	SettingsContextProvider,
} from "./contexts";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
	return (
		<ErrorBoundary>
			<DataContextProvider>
				<AuthContextProvider>
					<SettingsContextProvider>
						<ChakraProvider>
							<Router>
								<Layout />
							</Router>
						</ChakraProvider>
					</SettingsContextProvider>
				</AuthContextProvider>
			</DataContextProvider>
		</ErrorBoundary>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
