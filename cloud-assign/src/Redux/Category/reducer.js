import * as ActionTypes from "./actionTypes";

const initialState = {
  isloading: true,
  success: "",
  message: "",
  totalData: "",
  category: [],
  errMsg: "",
};

export const Category = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CATEGORY:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        message: action.payload.msg,
      };

    case ActionTypes.GET_ALL_CATEGORY:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        category: action.payload.data,
        totalData: action.payload.totalData,
      };

    default:
      return state;
  }
};
