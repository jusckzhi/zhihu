// 首页状态
import { requestNew, requestBefore } from "../util/request";

// 1、state
const initState = {
  isShowSideBar: false, //侧边栏出现的状态
  n: 0, //到底次数
  isRequest: true, //请求之前数据开关
  banner: [], //轮播图数据
  list: [], //列表数据
};

//2、action
// 修改banner action
const changeBannerAction = (arr) => ({
  type: "changeBanner",
  banner: arr,
});

// 修改list的action
const changeListAction = (item) => ({
  type: "changeList",
  item: item,
});

// 6、请求首页最新数据的action
export const requestNewAction = () => {
  return (dispatch, getState) => {
    const { list } = getState().home;
    if (list.length > 0) {
      return;
    }
    //发起请求
    requestNew().then((res) => {
      //修改轮播图
      dispatch(changeBannerAction(res.data.top_stories));

      //修改list
      dispatch(
        changeListAction({
          title: "今日新闻",
          data: res.data.stories,
        })
      );
    });
  };
};
// 修改侧边栏
export const changeIsShowSideBarAction = (bool) => ({
  type: "changeIsShowSideBar",
  bool: bool,
});
// 修改n的action
export const changeNAction = (n) => ({
  type: "changeN",
  n: n,
});
// 获取过往信息的请求
export const requestBeforeAction = (date, showDate) => {
  return (dispatch, getState) => {
    requestBefore(date).then((res) => {
      //开启发请求的开关
      dispatch(changeIsRequestAction(true));

      //给list状态添加一条数据
      dispatch(
        changeListAction({
          title: showDate,
          data: res.data.stories,
        })
      );
    });
  };
};
// 修改isRequest action
export const changeIsRequestAction = (bool) => ({
  type: "changeIsRequest",
  bool: bool,
});

// 3、reducer
const homeReducer = (state = initState, action) => {
  switch (action.type) {
    //修改banner
    case "changeBanner":
      return {
        ...state,
        banner: action.banner,
      };
    //修改list
    case "changeList":
      const { list } = state;
      list.push(action.item);
      return {
        ...state,
        list: [...list],
      };
    //修改侧边栏
    case "changeIsShowSideBar":
      return {
        ...state,
        isShowSideBar: action.bool,
      };
    //修改n
    case "changeN":
      return {
        ...state,
        n: action.n,
      };
    //修改isRequest
    case "changeIsRequest":
      return {
        ...state,
        isRequest: action.bool,
      };
    default:
      return state;
  }
};
// 5、导出
export default homeReducer;

// 4、reselect
export const getBanner = (state) => state.home.banner;
export const getList = (state) => state.home.list;
export const getIsShowSideBar = (state) => state.home.isShowSideBar;
export const getN = (state) => state.home.n;
export const getIsRequest = (state) => state.home.isRequest;
