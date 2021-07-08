import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';


const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer
});

// get the cartItems from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

// get the user information from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;

const initialState = {
	cart: { cartItems: cartItemsFromStorage },
	userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

// composeWithDevTools is for Redux dev tool in Chrome
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 
