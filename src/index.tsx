import React from "react";
import ReactDOM from "react-dom";
import { loadServer, DevTools } from "jira-dev-tool";
import "antd/dist/antd.less"; // 方便后面自定义

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AppProviders } from "./context";

loadServer(() =>
  ReactDOM.render(
    <React.StrictMode>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </React.StrictMode>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
