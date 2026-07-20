import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error:", error);
    console.log("Error Info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
            <h1 className="text-3xl font-bold text-red-500">
              Something went wrong 😢
            </h1>

            <p className="text-slate-500 mt-4">
              Please refresh the page or try again later.
            </p>

            <button
              onClick={() =>
                window.location.reload()
              }
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;