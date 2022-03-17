import {GET_ORDERS, ORDERS_LOADING, CHECK_OUT} from '../actions/types.js';
const initState = {
        loading: false,
        orders: []
}

export default function(state = initState, action){
    switch(action.type){
        case ORDERS_LOADING:
            return({
                ...state, 
                loading: true
            });
        //action.payload is an order for a particular user after their id was given. 
        case GET_ODERS: 
            return({
                ...state,
                orders: action.payload
            });
        //action.payload is a new order after transaction was successfully processed. The new order
        //will be added to orders array.
        case CHECK_OUT:
            return({
                ...state,
                orders: [...state.orders, action.payload]
            })
        default:
            return state;
    }   
}