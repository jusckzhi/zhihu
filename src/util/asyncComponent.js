/**
 * @author xiaozhi
 * @description 懒加载
 */

import React, { Component } from "react";

function asyncComponent(fn) {
  class resuleComponent extends Component {
    constructor() {
      super();
      this.state = {
        C: null,
      };
    }
    componentDidMount() {
      fn().then((module) => {
        this.setState({
          C: module.default,
        });
      });
    }

    render() {
      const { C } = this.state;
      return <div>{C ? <C {...this.props}></C> : null}</div>;
    }
  }

  return resuleComponent;
}
export default asyncComponent;
