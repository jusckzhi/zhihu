import React, { Component } from "react";
import { Accordion } from "antd-mobile";
import { requestLong, requestShort } from "../../util/request";
import Back from "../../components/Back/Back";
import "./Comment.css";
import timeFilter from "../../util/timeFilter";
class Comment extends Component {
  constructor() {
    super();
    this.state = {
      long: [],
      short: [],
    };
  }
  componentDidMount() {
    requestLong(this.props.match.params.id).then((res) => {
      this.setState({
        long: res.data.comments,
      });
    });
    requestShort(this.props.match.params.id).then((res) => {
      this.setState({
        short: res.data.comments,
      });
    });
  }
  render() {
    const { long, short } = this.state;
    return (
      <div className="collect">
        <div className="header">
          <div className="header-left">
            <Back></Back>
          </div>
          <div className="header-right">
            <h3>{long.length + short.length + "条评论"}</h3>
          </div>
        </div>
        <div>
          <Accordion accordion openAnimation={{}}>
            <Accordion.Panel header={`${long.length} 条长评`}>
              {long.length > 0 ? (
                <ul className="my-list">
                  {long.map((item) => {
                    return (
                      <li key={item.id}>
                        <div className="comment-img">
                          <img src={item.avatar} alt="" />
                        </div>
                        <div className="comment-con">
                          <h4>{item.author}</h4>
                          <div className="con">{item.content}</div>
                          <p>{timeFilter(item.time)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="comment-no">暂无长评论</div>
              )}
            </Accordion.Panel>
            <Accordion.Panel header={`${short.length} 条短评`}>
              {short.length > 0 ? (
                <ul className="my-list">
                  {short.map((item) => {
                    return (
                      <li key={item.id}>
                        <div className="comment-img">
                          <img src={item.avatar} alt="" />
                        </div>
                        <div className="comment-con">
                          <h4>{item.author}</h4>
                          <div className="con">{item.content}</div>
                          <p>{timeFilter(item.time)}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="comment-no">暂无短评论</div>
              )}
            </Accordion.Panel>
          </Accordion>
        </div>
      </div>
    );
  }
}
export default Comment;
