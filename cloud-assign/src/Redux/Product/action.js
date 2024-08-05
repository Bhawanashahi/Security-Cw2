import axios from "axios";
import { BaseUrl } from "../../Shared/BaseUrl";
import * as ActionTypes from "./actionTypes";

export const productLoading = () => ({
  type: ActionTypes.PRODUCT_LOADING,
});

export const fetchAddProduct = (body) => (dispatch) => {
  dispatch(productLoading());
  return axios.post(`${BaseUrl}/product/add`, body).then(({ data }) => {
    if (data.success) {
      dispatch({
        type: ActionTypes.ADD_PRODUCT,
        payload: data,
      });
    }
  });
};

export const fetchGetProducts = () => (dispatch) => {
  dispatch(productLoading());
  return axios
    .get(`${BaseUrl}/product`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.GET_ALL_PRODUCT,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("err", e);
    });
};

export const fetchGetProductsById = (id) => (dispatch) => {
  dispatch(productLoading());
  return axios
    .get(`${BaseUrl}/product/${id}`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.GET_PRODUCT_BY_ID,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("err", e);
    });
};

export const fetchGetRecentlyAdded = () => (dispatch) => {
  dispatch(productLoading());
  return axios
    .get(`${BaseUrl}/product/get/recentlyAdded`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.GET_RECENTLY_ADDED_PRODUCT,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("err", e);
    });
};

export const fetchGetProductByCategory = (catId) => (dispatch) => {
  console.log(catId);
  dispatch(productLoading());
  return axios
    .get(`${BaseUrl}/product/category/${catId}`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.GET_PRODUCT_BY_CATEGRY,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("err", e);
    });
};
