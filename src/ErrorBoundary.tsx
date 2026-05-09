import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: '#ffb4ab', backgroundColor: '#111417', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2>Application Error</h2>
          <p>Something went wrong loading the dashboard. Please try reloading.</p>
          <pre style={{ color: '#E1E2E7', background: '#1A1D21', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ padding: '10px 20px', background: '#BB86FC', color: '#111417', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px', fontWeight: 'bold' }}
          >
            Reload Dashboard
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
