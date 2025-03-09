'use client';

import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-zinc-800 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Something went wrong</h3>
            <p className="text-gray-300 mb-6">
              We couldn&apos;t load the team information. Please try again later.
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="bg-[#D4AF37] hover:bg-[#C4A027] text-black font-bold py-2 px-4 rounded"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;