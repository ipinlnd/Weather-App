import React from "react";

interface ErrorProps {}

interface ErrorStates {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorProps, ErrorStates> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch = (error: any, errorInfo: any) => {
    console.log(error, errorInfo);
    alert(errorInfo);
  };

  render() {
    if (this.state.hasError) {
      return null;
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
