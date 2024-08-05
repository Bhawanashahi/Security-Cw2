import axios from "axios";
import { BaseUrl } from "../../Shared/BaseUrl";
import * as ActionTypes from "./actionTypes";

export const categoryLoading = () => ({
  type: ActionTypes.CATEGORY_LOADING,
});

export const fetchAddCategory = (body) => (dispatch) => {
  dispatch(categoryLoading());
  return axios.post(`${BaseUrl}/category/add`, body).then(({ data }) => {
    if (data.success) {
      dispatch({
        type: ActionTypes.ADD_CATEGORY,
        payload: data,
      });
    }
  });
};

export const fetchGetCategories = (key) => (dispatch) => {
  dispatch(categoryLoading());
  return axios
    .get(`${BaseUrl}/category`)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.GET_ALL_CATEGORY,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("err", e);
    });
};
