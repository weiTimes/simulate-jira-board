import React from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./screens/UnauthenticatedApp";
import { ErrorBoundary, FullPageError } from "./components";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        <header className="App-header">
          {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </header>
      </ErrorBoundary>
    </div>
  );
}

export default App;
