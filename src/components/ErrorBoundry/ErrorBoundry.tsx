import React, { Component, ErrorInfo } from "react";

interface ErrorBoundryState {
	hasError: boolean;
}

class ErrorBoundry extends React.Component<
	React.ComponentPropsWithRef<typeof Component>,
	ErrorBoundryState
> {
	constructor(props: React.ComponentPropsWithRef<typeof Component>) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// during initial project setup pipe this info
		// to sentry or similar logging service
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1>Approaching the edge of the world, turn back.</h1>
				</div>
			);
		}
		return this.props.children;
	}
}

export default ErrorBoundry;
