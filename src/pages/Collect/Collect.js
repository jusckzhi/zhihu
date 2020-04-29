import React, { Component } from "react";
import { connect } from "react-redux";
import { getCollections } from "../../store/collections";
import { Link } from "react-router-dom";
import Back from "../../components/Back/Back";
import "./Collect.css";

class Collect extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {}

  render() {
    const { collections } = this.props;
    return (
      <div className="collect">
        <div className="collect-title">
          <Back></Back>
          <span>我的收藏</span>
        </div>
        {collections.length > 0 ? (
          collections.map((item) => {
            return (
              <div key={item.id} className="collect-list">
                <Link to={`/detail/${item.id}`} className="indetail">
                  <p>{item.title}</p>
                  <img src={item.image} alt="" />
                </Link>
              </div>
            );
          })
        ) : (
          <div className="no-collect">亲，暂无收藏哦！</div>
        )}
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
    // cancel: (id) => dispatch(cancelAction(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Collect);
