import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Drawer } from "antd-mobile";
import Banner from "../../components/Banner/Banner";
import List from "../../components/List/List";
import "./Index.css";
import { connect } from "react-redux";

import {
  getList,
  getBanner,
  requestNewAction,
  getIsShowSideBar,
  changeIsShowSideBarAction,
  requestBeforeAction,
  changeNAction,
  getN,
  getIsRequest,
  changeIsRequestAction,
} from "../../store/home";

class Index extends Component {
  componentDidMount() {
    // 获取最新数据
    this.props.requestNew();
    // 修改顶部数据
    window.onscroll = () => {
      // 获取所有的titles
      var titles = document.querySelectorAll("");
      // 要修改的节点
      const header = document.querySelector("");
      var arr = [];
      // 将所有的titles距离屏幕的距离存在arr中
      for (let i = 0; i < titles.length; i++) {
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

      // 到底判断

      // 窗口高度
      var wh = document.documentElement.clientHeight;
      // 文档高度
      var dh = document.documentElement.offsetHeight;
      // 上卷距离
      var st = document.documentElement.scrollTop || document.body.scrollTop;

      if (st + wh + 50 > dh && this.props.isRequest) {
        // 关掉开光
        this.props.changeIsRequest(false);

        // 发起获取过往信息的请求
        // 有一个n,记录到底的次数，到底一次，n+1,根据新的n，计算出发起请求的时间和展示的时间
        this.props.changeN(this.props.n + 1);
        // 展示时间
        var showTime = this.getTime(this.props.n).show;
        // 参数时间
        var paramsTime = this.getTime(this.props.n).params;
        // 根据请求时间，发起请求
        this.props.requestBefore(paramsTime, showTime);
      }
    };
  }

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

  render() {
    const { banner, list, isShow, changeIsShow } = this.props;

    const sidebar = <div>收藏</div>;

    return (
      <div className="index">
        <div className="header">
          <div className="header-left">
            <span
              className="iconfont icon-caidan"
              onClick={() => changeIsShow(false)}
            ></span>
            <span>首页</span>
          </div>
          <div className="header-right">
            <span className="iconfont icon-fcstubiao25"></span>
            <span className="iconfont icon-menu-v"></span>
          </div>
        </div>
        <Drawer
          className="my-drawer"
          sidebar={sidebar}
          open={isShow}
          onOpenChange={() => changeIsShow(false)}
        >
          {banner.length > 0 ? <Banner banner={banner}></Banner> : null}
          {list.length > 0 ? <List list={list}></List> : null}
        </Drawer>
      </div>
    );
  }
}
// 导出状态
const mapState = (state) => {
  return {
    list: getList(state),
    banner: getBanner(state),
    isShow: getIsShowSideBar(state),
    n: getN(state),
    isRequest: getIsRequest(state),
  };
};
// 导出方法
const mapDispatch = (dispatch) => {
  return {
    requestNew: () => dispatch(requestNewAction()),
    changeIsShow: (bool) => dispatch(changeIsShowSideBarAction(bool)),
    changeN: (n) => dispatch(changeNAction(n)),
    requestBefore: (date, show) => dispatch(requestBeforeAction(date, show)),
    changeIsRequest: (bool) => dispatch(changeIsRequestAction(bool)),
  };
};
export default connect(mapState, mapDispatch)(Index);
