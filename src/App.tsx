import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/ProjectList";
import { useArray } from "./utils";
import { Login } from "./screens/Login";

function App() {
  const person: { name: string; age: number }[] = [
    { name: "John", age: 30 },
    { name: "Andy", age: 24 },
  ];
  // const { value, clear, removeIndex, add } = useArray(person);

  return (
    <div className="App">
      <header className="App-header">
        <Login />
        {/* <ProjectListScreen /> */}
      </header>
    </div>
  );
}

export default App;
