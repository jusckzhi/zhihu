/**
 * @author zhi
 * @description 根组件
 */

import React, { Component } from "react";
import asyncComponent from "./util/asyncComponent";
import { Switch, Route, Redirect } from "react-router-dom";

const Index = asyncComponent(() => import("./pages/Index/Index"));
const Comment = asyncComponent(() => import("./pages/Comment/Comment"));
const Detail = asyncComponent(() => import("./pages/Detail/Detail"));
const Collect = asyncComponent(() => import("./pages/Collect/Collect"));

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div>
        <Switch>
          <Route path="/index" component={Index}></Route>
          <Route path="/comment/:id" component={Comment}></Route>
          <Route path="/detail/:id" component={Detail}></Route>
          <Route path="/collect" component={Collect}></Route>
          <Redirect to="/index"></Redirect>
        </Switch>
      </div>
    );
  }
}

export default App;
