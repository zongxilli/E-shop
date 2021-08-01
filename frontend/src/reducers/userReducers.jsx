import {
	USER_DELETE_FAIL,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_RESET,
	USER_DETAILS_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_REQUEST,
	USER_LIST_RESET,
	USER_LIST_SUCCESS,
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_FAIL,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_RESET,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_UPDATE_REQUEST,
	USER_UPDATE_RESET,
	USER_UPDATE_SUCCESS,
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
		//= the logout action will
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

export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return { ...state, loading: true };

		case USER_DETAILS_SUCCESS:
			return { loading: false, user: action.payload };

		case USER_DETAILS_FAIL:
			return { loading: false, error: action.payload };

		// Add USER_DETAILS_RESET to Logout () => {}
		// in order to clear the state when user logout
		//= the logout arrow function will
		//= not only dispatch USER_LOGOUT + USER_LOGOUT reducers
		//= but also dispatch USER_DETAILS_RESET reducers now
		// Without this => the state will keep the first one 's state
		// which will show the state of previous user, not the current one
		// because the past state isn't cleaned yet
		case USER_DETAILS_RESET:
			return { user: {} };

		default:
			return state;
	}
};

export const userUpdateProfileReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_UPDATE_PROFILE_REQUEST:
			return { loading: true };

		case USER_UPDATE_PROFILE_SUCCESS:
			return { loading: false, success: true, userInfo: action.payload };

		case USER_UPDATE_PROFILE_FAIL:
			return { loading: false, error: action.payload };

		case USER_UPDATE_PROFILE_RESET:
			return {};

		default:
			return state;
	}
};

export const userListReducer = (state = { users: [] }, action) => {
	switch (action.type) {
		case USER_LIST_REQUEST:
			return { loading: true };

		case USER_LIST_SUCCESS:
			return { loading: false, users: action.payload };

		case USER_LIST_FAIL:
			return { loading: false, error: action.payload };

		case USER_LIST_RESET:
			return { users: [] };

		default:
			return state;
	}
};

export const userDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_DELETE_REQUEST:
			return { loading: true };

		case USER_DELETE_SUCCESS:
			return { loading: false, success: true };

		case USER_DELETE_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const userUpdateReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_UPDATE_REQUEST:
			return { loading: true };

		case USER_UPDATE_SUCCESS:
			return { loading: false, success: true };

		case USER_UPDATE_FAIL:
			return { loading: false, error: action.payload };

		case USER_UPDATE_RESET:
			return {
				user: {},
			};

		default:
			return state;
	}
};
