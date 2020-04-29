import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Back extends Component {
  goBack() {
    this.props.history.go(-1);
  }
  render() {
    return (
      <div className="iconfont icon-fanhui" onClick={() => this.goBack()}></div>
    );
  }
}
export default withRouter(Back);
