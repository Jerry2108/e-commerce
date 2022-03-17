import axios from 'axios';
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from './types.js';
import  {returErrors} from './errorActions.js';

//get items 
export const getItems = () => (dispatch) =>{
    //first set items as loading
    dispatch(setItemsLoading());

    axios.get('/api/items').then(data => {
        dispatch({type: GET_ITEMS, payload: data})
    }).catch(errors => dispatch(returnErrors(errors.response.data, errors.response.status)));
}

//take an item object from a front-end form and then send this data to the API endpoint by Axios. 
export const addItem = (item) => (dispatch) =>{
    //headers
    const config = {
        headers:{
            'Content-type': 'application/json'
        }
    }
    //convert the item object into JSON. 
    let item = JSON.stringify(item);
    axios.post('/api/items', item, config).then(data=>{
        dispatch({type: ADD_ITEM, payload: data})
    }).catch(errors => dispatch(returnErrors(errors.response.data, errors.response.status)));
}

//delete an item
export const deleteItem = (id) => (dispatch) => {
    axios.delete(`/api/items/${id}`)
        .then(res => dispatch({
            type: DELETE_ITEM,
            payload: id
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

//update an item
//res.data is a new updated version
export const updateItem = (id, item) => (dispatch) => {
    axios.put(`/api/items/${id}`, item)
        .then(res => dispatch({
            type: UPDATE_ITEM,
            payload: Promise.all([id, res.data])
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}


export const setItemsLoading = () => {
    return{
        type: ITEMS_LOADING
    }
}