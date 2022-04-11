import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import AuthenticatedApp from "authenticated-app";
import UnauthenticatedApp from "screens/unauthenticated-app";
import ErrorBoundary from "components/error-boundary";
import { FullPageErrorFallback } from "components/lib";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { user } = useAuth();
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </QueryClientProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
