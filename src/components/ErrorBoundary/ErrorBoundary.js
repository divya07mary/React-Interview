import React, { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: "" };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        this.setState({ error, errorInfo });
    }

    render() {
        const { hasError, error, errorInfo } = this.state;
        if (hasError) {
            // You can render any custom fallback UI
            return <p>
                {error ? (error + ": " + errorInfo) : "Something went wrong!"}
            </p>;
        }

        return this.props.children;
    }
}