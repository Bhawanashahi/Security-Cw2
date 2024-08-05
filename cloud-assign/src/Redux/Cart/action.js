import axios from "axios";
import { BaseUrl } from "../../Shared/BaseUrl";
import * as ActionTypes from "./actionTypes";

export const cartLoading = () => ({
  type: ActionTypes.CART_LOADING,
});

export const fetchAddCart = (body) => (dispatch) => {
  dispatch(cartLoading());
  return axios.post(`${BaseUrl}/cart/addToCart`, body).then(({ data }) => {
    if (data.success) {
      dispatch({
        type: ActionTypes.ADD_CART,
        payload: data,
      });
    }
  });
};

export const fetchGetCartByUser = (id) => (dispatch) => {
  dispatch(cartLoading());
  return axios
    .get(`${BaseUrl}/cart/${id}`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.GET_CART_BY_USER,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("err", e);
    });
};
