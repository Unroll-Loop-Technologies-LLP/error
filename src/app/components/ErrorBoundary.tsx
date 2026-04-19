import { Component, ReactNode } from "react";
import { ErrorLanding } from "./ErrorLanding";
import { ParticleBackground } from "./ParticleBackground";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative size-full min-h-screen bg-[#0a0e27] overflow-hidden">
          <ParticleBackground />

          <div
            className="fixed inset-0 pointer-events-none z-50 mix-blend-overlay opacity-5"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)",
              }}
            />
          </div>

          <div
            className="fixed inset-0 pointer-events-none z-40"
            style={{
              background:
                "radial-gradient(circle at center, transparent 0%, rgba(10, 14, 39, 0.8) 100%)",
            }}
          />

          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <ErrorLanding errorCode={500} onStartGame={this.handleReset} />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
