import React from "react";
import { render } from "react-dom";
import App from "../../containers/App";
import { Provider } from "react-redux";
import configureStore from "./store";


const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
