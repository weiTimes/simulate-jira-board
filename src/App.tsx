import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ProjectListScreen } from "./screens/ProjectList";
import { useArray } from "./utils";

function App() {
  const person: { name: string; age: number }[] = [
    { name: "John", age: 30 },
    { name: "Andy", age: 24 },
  ];
  const { value, clear, removeIndex, add } = useArray(person);

  return (
    <div className="App">
      <header className="App-header">
        <ProjectListScreen />

        {value.map((p, index) => (
          <div key={`${p.name}${index}`}>
            <span>
              {index}
              {p.name}{" "}
            </span>
            <span>{p.age}</span>
          </div>
        ))}

        <button onClick={() => add({ name: "smith", age: 28 })}>添加</button>
        <button onClick={() => removeIndex(0)}>删除第一个</button>
        <button onClick={() => clear()}>删除所有</button>

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
