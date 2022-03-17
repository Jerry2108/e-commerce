import { STATES } from 'mongoose';
import {CART_LOADING, ADD_TO_CART, DELETE_FROM_CART, GET_CART} from '../actions/types.js';

//an initial state for cart 
const initialState = {
    cart: null,
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case CART_LOADING:
            return({
                cart:null,
                loading:true
            });
        case GET_CART:
            return({
                loading: false,
                cart: action.payload
            });
        case ADD_TO_CART:
            return({
                ...state,
                cart: action.payload
            });
        case DELETE_FROM_CART:
            return({
                ...state,
                cart: action.payload
            });
        default:
            return state;
    }
}