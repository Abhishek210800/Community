import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "./Redux/store"; // Import Redux store

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}> {/* Wrap App with Redux Provider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);





