import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";

// Import Bootstrap styles
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// Use 'basename' for GitHub Pages deployment
const BASENAME = "/marzok16.github.io"; // replace with your repo name if it's different

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/movie-app">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
