import * as ActionTypes from "./actionTypes";

const initialState = {
  isloading: true,
  success: "",
  message: "",
  totalData: "",
  cartData: [],
  errMsg: "",
};

export const Cart = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_CART:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        message: action.payload.msg,
      };

    case ActionTypes.GET_CART_BY_USER:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        cartData: action.payload.data,
        totalData: action.payload.totalData,
      };

    default:
      return state;
  }
};
