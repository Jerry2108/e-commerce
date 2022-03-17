import {GET_ERRORS, CLEAR_ERRORS} from './types.js';

//This function creates actions of type GET_ERRORS
export function returnErrors(message, id = null, status){
    return({
        type: GET_ERRORS, 
        payload: {message, id, status}
    });
}

//This function creates actions of type CLEAR_ERRORS
export function clearErrors(){
    return({
        type: CLEAR_ERRORS
    });
}
