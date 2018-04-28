import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR , UNAUTH_USER, FETCH_MESSAGE} from './types';
const ROOT_URL = 'http://localhost:3090';

export function signInUser({ email, password}){
    return  function(dispatch){
        authReq('signin', dispatch, email, password);
    }
}

export function signUpUser({email, password}){
    return function(dispatch){
        authReq('signup', dispatch, email, password);
    }
}

export function authError(error){
    return {
        type: AUTH_ERROR,
        payload:error   
    }
}

export function signoutUser(){
    localStorage.removeItem('token');
    return{type: UNAUTH_USER}
}

export function fetchMessage(){
    return function(dispatch){

        axios.get(ROOT_URL,{
            headers: { authorization: localStorage.getItem('token')}
        }).then((res) =>{
            console.log(res)
            dispatch({
                type:FETCH_MESSAGE,
                payload: res.data.message
            })
        }).catch((err)=>{
            console.log(err.resposne)
        })
        
    }
}



const authReq = async (uriRest, dispatch, email, password) =>{

    try{
        const response = await axios.post(`${ROOT_URL}/${uriRest}`, { email, password})

        dispatch({ type: AUTH_USER});
        
        localStorage.setItem('token', response.data.token);

        browserHistory.push('/feature');
    }
    catch(error){
        dispatch(authError(error.response.data.error));
    }
}

