//import component reducers
import authReducer from './authReducer';
import cartReducer from './cartReducer';
import errorReducer from './errorReducer';
import itemReducer from './itemReducer';
import orderReducer from './orderReducer';

import {combineReducers} from 'redux';

export const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    error: errorReducer,
    item: itemReducer,
    order: orderReducer
});