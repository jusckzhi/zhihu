import React, { Component } from "react";
import { Carousel } from "antd-mobile";
import { requestNew } from "../../util/request";
import { Link } from "react-router-dom";
import "./Index.css";

export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    // n = 0;
  }
  componentDidMount() {
    requestNew().then((res) => {
      console.log(res);
      this.setState({
        data: res.data,
      });
    });
  }
  // getTime(n) {
  //   //n-1天前的时间对象
  //   var paramsDate = new Date(
  //     new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000
  //   );
  //   var paramsDateYear = paramsDate.getFullYear();
  //   var paramsDateMonth = (paramsDate.getMonth() + 1 + "").padStart(2, "0");
  //   var paramsDateDate = (paramsDate.getDate() + "").padStart(2, "0");
  //   var params = paramsDateYear + paramsDateMonth + paramsDateDate; //参数

  //   //n天前的时间对象
  //   var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);
  //   var showDateMonth = (showDate.getMonth() + 1 + "").padStart(2, "0");
  //   var showDateDate = (showDate.getDate() + "").padStart(2, "0");
  //   var day = showDate.getDay(); //0-6
  //   var arr = [
  //     "星期日",
  //     "星期一",
  //     "星期二",
  //     "星期三",
  //     "星期四",
  //     "星期五",
  //     "星期六",
  //   ];
  //   var week = arr[day];
  //   var show = showDateMonth + "月" + showDateDate + "日" + " " + week;

  //   return {
  //     params,
  //     show,
  //   };
  // }
  render() {
    const { top_stories, stories } = this.state.data;

    console.log(top_stories);
    return (
      <div className="index">
        <div className="header">
          <div className="header-left">
            <span className="iconfont icon-caidan"></span>
            <span>首页</span>
          </div>
          <div className="header-right">
            <span className="iconfont icon-fcstubiao25"></span>
            <span className="iconfont icon-menu-v"></span>
          </div>
        </div>
        <div className="banner">
          {top_stories ? (
            <Carousel autoplay={true} infinite>
              {top_stories.map((item) => {
                return (
                  <div className="banner-item" key={item.id}>
                    <a href={item.url}>
                      <img src={item.image} alt="" />
                    </a>
                    <p>{item.title}</p>
                  </div>
                );
              })}
            </Carousel>
          ) : null}
        </div>
        <div className="index-con">
          <h3>今日新闻</h3>
          <ul>
            {stories
              ? stories.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link to={`/detail/${item.id}`}>
                        <p>{item.title}</p>
                        <img src={item.images[0]} alt="" />
                      </Link>
                    </li>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
    );
  }
}
/*
import { Drawer, List, NavBar, Icon } from 'antd-mobile';

class App1 extends React.Component {
  state = {
    open: true,
  }
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  render() {
    // fix in codepen
    const sidebar = (<List>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
        if (index === 0) {
          return (<List.Item key={index}
            thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
            multipleLine
          >Category</List.Item>);
        }
        return (<List.Item key={index}
          thumb="https://zos.alipayobjects.com/rmsportal/eOZidTabPoEbPeU.png"
        >Category{index}</List.Item>);
      })}
    </List>);

    return (<div>
      <NavBar icon={<Icon type="ellipsis" />} onLeftClick={this.onOpenChange}>Basic</NavBar>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        enableDragHandle
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebar={sidebar}
        open={this.state.open}
        onOpenChange={this.onOpenChange}
      >
        Click upper-left corner
      </Drawer>
    </div>);
  }
}

ReactDOM.render(<App1 />, mountNode);
.my-drawer {
  position: relative;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.my-drawer .am-drawer-sidebar {
  background-color: #fff;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.my-drawer .am-drawer-sidebar .am-list {
  width: 300px;
  padding: 0;
}

*/
