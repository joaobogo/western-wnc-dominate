import { Component, type ErrorInfo, type ReactNode } from "react";
import { logError } from "@/lib/error-reporting";

interface Props {
  children: ReactNode;
  /** Where in the tree this boundary is mounted — helps in analytics. */
  boundary?: string;
  /** Optional custom fallback. Receives the error and a reset callback. */
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * React error boundary — catches any render-phase throw beneath it, reports to
 * analytics via `logError`, and shows a branded fallback with retry + reload.
 *
 * Two boundaries are wired in the app:
 *   • App-level (in `App.tsx`) — last-resort safety net.
 *   • Route-level (inside <Suspense>) — one broken page can't nuke the shell.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logError(error, {
      source: `ErrorBoundary:${this.props.boundary ?? "unknown"}`,
      extra: { componentStack: info.componentStack },
    });
  }

  reset = () => this.setState({ error: null });

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    if (this.props.fallback) return this.props.fallback(error, this.reset);

    return (
      <div
        role="alert"
        className="min-h-[60vh] flex items-center justify-center px-6 py-16 bg-background text-foreground"
      >
        <div className="max-w-lg text-center">
          <p className="text-sm uppercase tracking-widest text-highland-gold mb-3">
            Something interrupted this page
          </p>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            We hit a snag loading this view.
          </h1>
          <p className="text-muted-foreground mb-8">
            The team has been notified. You can retry, head back to the homepage, or call us
            directly at{" "}
            <a href="tel:+18285247773" className="text-highland-gold underline underline-offset-4">
              828-524-7773
            </a>
            .
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              type="button"
              onClick={this.reset}
              className="px-5 py-2.5 rounded-md bg-highland-green text-white font-medium hover:bg-highland-green/90 transition"
            >
              Try again
            </button>
            <a
              href="/"
              className="px-5 py-2.5 rounded-md border border-border font-medium hover:bg-muted transition"
            >
              Go home
            </a>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-md border border-border font-medium hover:bg-muted transition"
            >
              Reload page
            </button>
          </div>
          {import.meta.env.DEV && (
            <pre className="mt-8 text-left text-xs bg-muted p-4 rounded overflow-auto max-h-64">
              {error.stack ?? error.message}
            </pre>
          )}
        </div>
      </div>
    );
  }
}