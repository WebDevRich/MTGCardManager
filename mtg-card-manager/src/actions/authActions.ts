import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
	// GET_ERRORS,
	USER_LOADING,
} from './types';
// Register User
export const registerUser = (userData:any, callBack:any) => {
	axios
		.post('/api/users/register', userData)
		// re-direct to login on successful register
		.then(res => {
			window.location.assign('./');
			callBack(res);
		})
		.catch(err => {
			callBack(err.response);
		});
};
// Login - get user token
export const loginUser = (userData:any, callBack:any) => {
	axios
		.post('/api/users/login', userData)
		.then(res => {
			callBack(res);
		})
		.catch(err => {
			callBack(err.response);
		});
};
// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};
// Log user out
export const logoutUser = () => (dispatch:any) => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	// dispatch(setCurrentUser({}));
};
