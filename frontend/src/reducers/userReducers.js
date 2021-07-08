import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_LOGIN_REQUEST:
			return { loading: true };

		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };

		case USER_LOGOUT:
			return {};

		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_REGISTER_REQUEST:
			return { loading: true };

		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };

		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };

		// Add USER_LOGOUT in order to let user sign out not only from USER_LOGIN states,
		// but also sign out from REGISTER states 
		//= the logout action  will 
		//= not only dispatch USER_LOGOUT from userLoginReducer 
		//= but also dispatch USER_LOGOUT from userRegisterReducer
		// Without this => when register a new user -> logout -> 
		// -> try to click the register button for register again ->
		// -> the page redirects to homepage
		// Reason: {the redirect checks if the user has already register.
	  // If they did they can no longer access the RegisterScreen }
		// With this => this won't happen
		case USER_LOGOUT:
			return {};

		default:
			return state;
	}
};
