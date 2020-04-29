/**
 * @author zhi
 * @description 入口文件
 */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/index";

import App from "./App";
import "antd-mobile/dist/antd-mobile.css";
import "./assets/css/reset.css";
import "./assets/css/iconfont.css";
import "./assets/js/rem";
import { HashRouter } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App></App>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);
