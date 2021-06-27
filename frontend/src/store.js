import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	productListReducer,
	productDetailsReducer,
} from './reducers/productReducers';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

// composeWithDevTools is for Redux dev tool in Chrome
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
