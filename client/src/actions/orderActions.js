import { ORDERS_LOADING, CHECK_OUT, GET_ORDERS} from "./types";
import {returnErrors} from './errorActions.js';
import axios from "axios";

export const setOrdersLoading = () =>{
    return({
        type: ORDERS_LOADING
    });
}

//get orders for a user.
export const getOrders = (userId) => (dispatch) =>{
    dispatch(setOrdersLoading());
    axios.get(`/api/order/${id}`)
        .then(res => dispatch({
            type: GET_ORDERS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

//check out for a user. 
export const checkout = (id, source) => dispatch => {
    axios.post(`/api/order/${id}`, {source})
        .then(res => dispatch({
            type: CHECK_OUT,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


