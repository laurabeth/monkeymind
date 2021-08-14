import React, { Component, ErrorInfo } from "react";

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends React.Component<
	React.ComponentPropsWithRef<typeof Component>,
	ErrorBoundaryState
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

export { ErrorBoundary };
