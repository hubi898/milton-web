import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="empty-state" style={{ minHeight: "70vh", paddingTop: "20vh" }}>
          <h1>Doslo je do greske</h1>
          <button type="button" className="text-link" onClick={() => window.location.reload()}>
            Osvezi stranicu
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
