import React from "react";
import "./App.css";
import { useAuth } from "./context/AuthContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./screens/UnauthenticatedApp";
import styled from "@emotion/styled";

import ICON_LEFT from "./assets/left.svg";
import ICON_RIGHT from "./assets/right.svg";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-image: url(${ICON_LEFT}), url(${ICON_RIGHT});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
`;

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <Background />
      <header className="App-header">
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </header>
    </div>
  );
}

export default App;
