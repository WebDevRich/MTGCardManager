import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
import {
  // GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData:any, callBack:any) => {
  axios
    .post("/api/users/register", userData)
		.then(res => {
			window.location.assign('./');
			callBack(res);
		}) // re-direct to login on successful register
		// .then(res => console.log('hello'))
		.catch(err => {
			callBack(err.response);
		}
		// dispatch({
			//   type: GET_ERRORS,
      //   payload: err.response.data
      // })
		);
};
// Login - get user token
export const loginUser = (userData:any) => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage
			// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      // const decoded = jwt_decode(token);
      // Set current user
			// dispatch(setCurrentUser(decoded));
			window.location.assign('./');
    })
    .catch(err => console.log('error')
      // dispatch({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    );
};
// Set logged in user
export const setCurrentUser = (decoded:any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => (dispatch:any) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
