import React from "react";

class CustomErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 bg-gray-100 p-4 rounded">
          Something went wrong.
        </div>
      );
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;
