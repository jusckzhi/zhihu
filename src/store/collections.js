/**
 * @author zhi
 * @description 收藏模块
 */

const initState = {
  collections: [],
};

// 收藏的action
export const collectAction = (detail) => {
  return {
    type: "collect",
    detail: detail,
  };
};

// 取消的action
export const cancelAction = (id) => {
  return {
    type: "cancel",
    id: id,
  };
};

// reducer
const reducer = (state = initState, action) => {
  switch (action.type) {
    // 收藏
    case "collect":
      return {
        ...state,
        collections: [...state.collections, action.detail],
      };
    case "cancel":
      const { collections } = state;
      var idx = collections.findIndex((item) => item.id === action.id);
      collections.splice(idx, 1);
      return {
        ...state,
        collections: [...collections],
      };
    default:
      return state;
  }
};
export default reducer;

// 导出数据
export const getCollections = (state) => state.collections.collections;
