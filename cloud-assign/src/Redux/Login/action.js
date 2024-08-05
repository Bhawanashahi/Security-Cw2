import axios from "axios";
import { BaseUrl } from "../../Shared/BaseUrl";
import * as ActionTypes from "./actionTypes";

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING,
});

export const removeLogin = () => ({
  type: ActionTypes.REMOVE_LOGIN,
});

export const userLogin = (body) => (dispatch) => {
  dispatch(loginLoading());
  return axios
    .post(`${BaseUrl}/auth/signin`, body)
    .then(({ data }) => {
      if (data.success) {
        localStorage.setItem("role", data.data.role);
        if (data.data.userId) {
          localStorage.setItem("userId", data.data?.userId._id);
        } else if (data.data.adminId) {
          localStorage.setItem("userId", data.data.adminId._id);
        }

        dispatch({
          type: ActionTypes.LOGIN,
          payload: data,
        });
      }
    })
    .catch((err) => {
      dispatch({
        type: ActionTypes.LOGIN_FAIL,
        payload: err.response.data,
      });
    });
};

// export const fetchUser = () => (dispatch) => {
//   dispatch(loginLoading());
//   return axios
//     .get(`user/detail`, { withCredentials: true })
//     .then(({ data }) => {
//       console.log("data", data);
//       if (data.success) {
//         dispatch({
//           type: ActionTypes.FETCH_USER,
//           payload: data,
//         });
//       }
//     })
//     .catch((Err) => {
//       console.log("errrr fetch user", Err);
//     });
// };

export const userLogout = () => (dispatch) => {
  const body = {};
  dispatch(loginLoading());
  return axios.patch(`${BaseUrl}/user/signout`, body).then(({ data }) => {
    if (data.success) {
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      dispatch({
        type: ActionTypes.LOGOUT,
        payload: data,
      });
    }
  });
};

export const registerUser = (body) => (dispatch) => {
  dispatch(loginLoading());
  return axios
    .post(`${BaseUrl}/user/register`, body)
    .then(({ data }) => {
      if (data.success) {
        dispatch({
          type: ActionTypes.REGISTER,
          payload: data,
        });
      }
    })
    .catch((e) => {
      console.log("errr while register", e);
    });
};
