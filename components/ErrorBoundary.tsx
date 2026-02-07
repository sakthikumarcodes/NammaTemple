'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-slate-600 mb-4 text-sm">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: undefined });
                window.location.reload();
              }}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 transition text-sm"
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

