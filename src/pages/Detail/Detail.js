import React, { Component } from "react";
import { connect } from "react-redux";
import {
  collectAction,
  cancelAction,
  getCollections,
} from "../../store/collections";
import Back from "../../components/Back/Back";
import { requestDetail } from "../../util/request";
import "./Detail.css";
class Detail extends Component {
  constructor() {
    super();

    this.data = {};
    this.state = {
      css: "",
      img: "",
      id: "",
    };
    this.box = React.createRef();
  }
  componentDidMount() {
    this.state.id = this.props.match.params.id;
    requestDetail(this.state.id).then((res) => {
      this.data = res.data;
      this.box.current.innerHTML = res.data.body;
      this.setState({
        css: res.data.css[0],
        img: res.data.image,
        id: res.data.id,
      });
    });
  }
  collect() {
    this.props.history.push("/comment/" + this.props.match.params.id);
  }
  render() {
    const { collect, cancel, collections } = this.props;
    return (
      <div className="detail">
        {this.state.css ? (
          <link rel="stylesheet" href={this.state.css} />
        ) : null}
        <div className="header">
          <Back></Back>
          <div className="header-right">
            <span className="iconfont icon-fenxiang"></span>
            {collections.some((item) => item.id === this.state.id) ? (
              <span
                className="iconfont icon-shoucang-on yellow"
                onClick={() => cancel(this.state.id)}
              ></span>
            ) : (
              <span
                className="iconfont icon-shoucang-on"
                onClick={() => collect(this.data)}
              ></span>
            )}

            <span
              className="iconfont icon-fankui"
              onClick={() => this.collect()}
            ></span>
            <span className="iconfont icon-dianzan_active-copy-copy"></span>
          </div>
        </div>
        <img src={this.state.img} className="detail-img" alt="" />
        <div ref={this.box} className="detail-content"></div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    collections: getCollections(state),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    collect: (detail) => dispatch(collectAction(detail)),
    cancel: (id) => dispatch(cancelAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
