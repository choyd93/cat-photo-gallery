import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "src/modules/store";
import GlobalStyle from "src/assets/style/global";
import App from "src/App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
