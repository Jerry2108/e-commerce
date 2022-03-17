import { USER_LOADING, USER_LOADED, AUTH_ERROR, REGISTER_FAIL, REGISTER_SUCCESS, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT_SUCCESS} from "./types.js";
import { returnErrors } from "./errorActions.js";
import axios from 'axios';


//When an Axios API is called by a client to the server, the client need to provide a token called API key. 
//In this application, a token is sent as a request header. 
export const loadUser = () => (dispatch, getState) =>{
    //first set the type of action to be USER_LOADING before getting data from axios successfully. 
    dispatch({type: USER_LOADING});
    
    //fetch data from an API using axios
    axios.get('/api/user', tokenConfig(getState))
         .then(res => dispatch({type: USER_LOADED, payload: res.data}))
         .catch(errors => {
             dispatch(returnErrors(errors.response.data, errors.response.status));
             dispatch({type: AUTH_ERROR});
         });
}


//set up the request header. 
const tokenConfig = getState =>{
    //return the initial default token is stored from the local storage when the user first signup. This token is exchanged, 
    //not username/password when 
    const token = getState().token;

    //Headers
    const config = {
        headers:{
            "Content-type": "application/json"
        }
    }
    
    //x-auth-token 
    if (token){
        config.headers['x-auth-token'] = token;
    }
    return config; 
}

//register.
export const register = ({name, email, password})=> dispatch => {

    //headers
    const config = {
        headers:{
            'Content-type': "application/json"
        }
    };
    //convert object into json. 
    regsiteredInformation = JSON.stringify({name, email, password});

    axios.post('/api/register', registeredInformation, config)
        .then(res => dispatch({type: REGISTER_SUCCESS, payload: res.data}))
        .catch(errors => {
            dispatch(returnErrors(errors.response.data, errors.response.status));
            dispatch({type: REGISTER_FAIL});
        });
}

//login.
export const login = ({password, email})=> dispatch =>{

    //headers
    const config = {
        headers:{
            'Content-type': "application/json"
        }
    };

    //convert object into json. 
    regsiteredInformation = JSON.stringify({email, password});

    axios.post('/api/login', registeredInformation, config)
    .then(res => dispatch({type: LOGIN_SUCCESS, payload: res.data}))
    .catch(errors => {
        dispatch(returnErrors(errors.response.data, errors.response.status));
        dispatch({type: LOGIN_FAIL});
    });
}

//logout

export const logout = ()=> dispatch => dispatch({type: LOGOUT_SUCCESS});
