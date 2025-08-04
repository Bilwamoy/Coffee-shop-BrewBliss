"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Animation Error Boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Return fallback UI or the text without animation
      return this.props.fallback || (
        <div className="text-current">
          {/* Fallback content - just show the text without animation */}
          <span>Content temporarily unavailable</span>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;