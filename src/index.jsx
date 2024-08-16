// index.js
import React from "react";
import ReactDOM from "react-dom/client"; // Use react-dom/client for createRoot
import { Provider } from "react-redux";
import { store } from "./store"; // Import your Redux store
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
