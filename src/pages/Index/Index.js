import React, { Component } from "react";
import { Carousel } from "antd-mobile";
import { requestNew, requestBefore } from "../../util/request";
import { Link } from "react-router-dom";
import { Drawer } from "antd-mobile";
import title_img from "./title_img.jpg";

import "./Index.css";
export default class Index extends Component {
  constructor() {
    super();
    this.state = {
      top_stories: [], //轮播图
      data: [], //列表数据
      open: false, //抽屉开关
    };
    this.isRequest = false; //请求开关
    this.n = 0; //到底判断
  }
  componentDidMount() {
    requestNew().then((res) => {
      this.setState({
        top_stories: res.data.top_stories,
        data: [
          ...this.state.data,
          { title: "今日新闻", stories: res.data.stories },
        ],
      });
      this.isRequest = true;
    });

    // 到底判断
    window.onscroll = () => {
      // 修改顶部数据
      // 获取了所有的titles
      var titles = document.querySelectorAll(".list-title");
      // 要修改的节点
      const header = document.querySelector(".index-header-title");
      var arr = [];

      // 将所有的title距离屏幕的距离存在arr中
      for (var i = 0; i < titles.length; i++) {
        arr.push(titles[i].getBoundingClientRect().top);
      }

      // 最终要展示的第几个的titles
      var index = 0;

      // 找出arr中小于0的最后一项下标
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < header.clientHeight) {
          index = i;
        } else {
          break;
        }
      }
      header.innerHTML = index === 0 ? "知乎日报" : titles[index].innerHTML;

      // 窗口高度
      var wh = document.documentElement.clientHeight;
      // 文档高度
      var dh = document.documentElement.offsetHeight;
      // 上卷距离
      var st = document.documentElement.scrollTop || document.body.scrollTop;

      if (st + wh + 100 > dh && this.isRequest) {
        this.isRequest = false;
        this.n = this.n + 1;
        var showTime = this.getTime(this.n).show;
        var paramsTime = this.getTime(this.n).params;

        requestBefore(paramsTime).then((res) => {
          this.setState({
            data: [
              ...this.state.data,
              {
                title: showTime,
                stories: res.data.stories,
              },
            ],
          });

          this.isRequest = true;
        });
      }
    };
  }
  // 修改顶部数据

  // 善后工作
  componentWillUnmount() {
    window.onscroll = null;
  }
  // 计算时间
  getTime(n) {
    //n-1天前的时间对象
    var paramsDate = new Date(
      new Date().getTime() - (n - 1) * 24 * 60 * 60 * 1000
    );
    var paramsDateYear = paramsDate.getFullYear();
    var paramsDateMonth = (paramsDate.getMonth() + 1 + "").padStart(2, "0");
    var paramsDateDate = (paramsDate.getDate() + "").padStart(2, "0");
    var params = paramsDateYear + paramsDateMonth + paramsDateDate; //参数

    //n天前的时间对象
    var showDate = new Date(new Date().getTime() - n * 24 * 60 * 60 * 1000);
    var showDateMonth = (showDate.getMonth() + 1 + "").padStart(2, "0");
    var showDateDate = (showDate.getDate() + "").padStart(2, "0");
    var day = showDate.getDay(); //0-6
    var arr = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
    ];
    var week = arr[day];
    var show = showDateMonth + "月" + showDateDate + "日" + " " + week;

    return {
      params,
      show,
    };
  }

  // 抽屉菜单
  onOpenChange = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    const { top_stories } = this.state;
    const { data } = this.state;
    const sidebar = (
      <div>
        <div>
          <div className="sidebar_title">
            <div className="img">
              <img src={title_img} alt="" />
              <p>components</p>
            </div>
            <div className="nav">
              <Link to="/collect">
                <span className="iconfont icon-shoucang-on"></span>我的收藏
              </Link>
              <p>
                <span className="iconfont icon-dianzan_active-copy-copy"></span>
                离线下载
              </p>
            </div>
          </div>
        </div>
        <div className="sidebar_con">首页</div>
      </div>
    );

    return (
      <div className="index">
        <div className="header">
          <div className="header-left">
            <span
              className="iconfont icon-caidan"
              onClick={() => this.onOpenChange()}
            ></span>
            <span className="index-header-title">知乎日报</span>
          </div>
          <div className="header-right">
            <span className="iconfont icon-fcstubiao25"></span>
            <span className="iconfont icon-menu-v"></span>
          </div>
        </div>

        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          open={this.state.open}
          onOpenChange={this.onOpenChange}
        >
          <div className="banner">
            {top_stories ? (
              <Carousel autoplay={true} infinite>
                {top_stories.map((item) => {
                  return (
                    <div className="banner-item" key={item.id}>
                      <Link to={`/detail/${item.id}`}>
                        <img src={item.image} alt="" />
                      </Link>
                      <p>{item.title}</p>
                    </div>
                  );
                })}
              </Carousel>
            ) : null}
          </div>
          {data
            ? data.map((item) => {
                return (
                  <div className="index-con" key={item.title}>
                    <h3 className="list-title">{item.title}</h3>
                    <ul>
                      {item.stories.map((item) => {
                        return (
                          <li key={item.id}>
                            <Link
                              to={`/detail/${item.id}`}
                              className="indetail"
                            >
                              <p>{item.title}</p>
                              <img src={item.images[0]} alt="" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })
            : null}
        </Drawer>
      </div>
    );
  }
}
