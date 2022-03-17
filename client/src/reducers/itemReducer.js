import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM, ITEMS_LOADING} from  '../actions/itemActions.js';

const initialState = {
    items:[],
    loading:false
}

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return({
                loading: false,
                items: action.payload
            });
        //action.payload contains a new item required to be added. 
        case ADD_ITEM: 
            return({
                ...state,
                items: [...state.items, action.payload]
            });
        //action.payload is id of the deleted item.
        case DELETE_ITEM:{
            return({
                ...state,
                items: state.items.filter(item => item._id != action.payload)
            });
        }
        case UPDATE_ITEM:
            const {idOfUpdatedItem, updatedItem} = action.payload; 
            return({
                ...state, 
                items: state.items.Map(item =>{
                    if (item._id == idOfUpdatedItem){
                        item = updatedItem;
                    }
            })
        })
        case ITEMS_LOADING:
            return({
                ...state,
                loading: false,
            });
        default:
            return state;
    }
}


