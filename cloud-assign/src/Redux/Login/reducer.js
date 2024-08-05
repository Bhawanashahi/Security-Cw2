import * as ActionTypes from "./actionTypes";

const initialState = {
  isloading: false,
  user: null,
  success: "",
  lSuccess: "",
  message: "",
  errMsg: "",
  otpVerify: "",
  rsuccess: "",
};

export const Login = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        message: action.payload.message,
        user: action.payload.data,
      };

    case ActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isloading: false,
        errMsg: action.payload.error,
      };
    case ActionTypes.FETCH_USER:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        user: action.payload.user,
      };

    case ActionTypes.REGISTER:
      return {
        ...state,
        isloading: false,
        rsuccess: true,
        message: action.payload.message,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case ActionTypes.REMOVE_LOGIN:
      return {
        message: "",
        errMsg: "",
        otpVerify: "",
      };
    default:
      return state;
  }
};
