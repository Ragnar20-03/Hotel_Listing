import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      //@ts-ignore
      return <div>Something went wrong: {this.state.error?.message}</div>;
    }
    //@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
