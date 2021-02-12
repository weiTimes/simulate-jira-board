import React from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./screens/UnauthenticatedApp";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </header>
    </div>
  );
}

export default App;
