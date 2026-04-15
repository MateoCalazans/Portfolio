import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches crashes caused by browser translation tools (Google Translate, etc.)
 * mutating the DOM and breaking React's virtual DOM reconciliation.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Only log in dev — don't expose stack traces in prod
    if (import.meta.env.DEV) {
      console.warn("[ErrorBoundary] Caught error:", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#f0f0f0",
            fontFamily: "Inter, system-ui, sans-serif",
            textAlign: "center",
            padding: "2rem",
            gap: "1rem",
          }}
        >
          <p style={{ color: "#888", fontSize: "0.9rem" }}>
            Something went wrong. Try disabling browser translation and refresh.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.5rem",
              background: "#4A7BF7",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
