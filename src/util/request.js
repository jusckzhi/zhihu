import axios from "axios";
axios.interceptors.response.use((res) => {
  // console.log(res);
  return res;
});

// 首页请求 轮播图  今日新闻
export const requestNew = () => {
  return axios({
    url: "/api/4/stories/latest",
  });
};
// 获取之前的信息
export const requestBefore = (date) => {
  return axios({
    url: "/api/4/stories/before/" + date,
  });
};
// 详情
export const requestDetail = (id) => {
  return axios({
    url: "/api/4/story/" + id,
  });
};

// 文章长评
export const requestLong = (id) => {
  return axios({
    url: "/api/4/story/" + id + "/long-comments",
  });
};

// 文章短评
export const requestShort = (id) => {
  return axios({
    url: "/api/4/story/" + id + "/short-comments",
  });
};
