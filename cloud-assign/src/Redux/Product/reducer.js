import * as ActionTypes from "./actionTypes";

const initialState = {
  isloading: true,
  success: "",
  message: "",
  totalData: "",
  products: [],
  product: "",
  recentlyAdded: [],
  errMsg: "",
  catProduct: [],
  prodCat: [],
};

export const Product = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_PRODUCT:
      return {
        ...state,
        isloading: false,
        // success: action.payload.success,
        message: action.payload.message,
      };

    case ActionTypes.GET_ALL_PRODUCT:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        products: action.payload.data,
        totalData: action.payload.totalData,
      };

    case ActionTypes.GET_PRODUCT_BY_ID:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        product: action.payload.data,
      };

    case ActionTypes.GET_RECENTLY_ADDED_PRODUCT:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        recentlyAdded: action.payload.data,
      };

    case ActionTypes.GET_PRODUCT_BY_CATEGRY:
      return {
        ...state,
        isloading: false,
        success: action.payload.success,
        catProduct: action.payload.data,
        prodCat: action.payload.category,
      };

    default:
      return state;
  }
};
