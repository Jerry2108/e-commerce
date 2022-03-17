import {CART_LOADING, ADD_TO_CART, DELETE_FROM_CART} from './types.js';
import {returnErrors} from './errorActions.js';
import axios from 'axios';

//set carts loading
export const setCartsLoading = () => dispatch =>{
    return ({type: CART_LOADING});
}

// add items to cart
//takes an userId of a cart and productId(itemId) as parameters. 
export const addToCart  = (userId, productId, quantity) => dispatch =>{
    axios.post(`/api/cart/${userId}`, {productId, quantity}).then(res => dispatch({
        type: ADD_TO_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//delete items from cart 
//takes cartId and productId(itemId) as parameters
export const deleteFromCart = (userId, productId)=>dispatch=>{
    axios.delete(`/api/cart${userId}`, {productId}).then(res => dispatch({
        type: DELETE_FROM_CART,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//get a user's cart. 
export const getCart = (userId) => dispatch => {
    dispatch(setCartLoading());
    axios.get(`/api/cart/${id}`)
        .then(res => dispatch({
            type: GET_CART,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


