import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";

import "./index.css";
import { ConfigureStore } from "./Redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = ConfigureStore();
root.render(
  <div className="font-serif">
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
