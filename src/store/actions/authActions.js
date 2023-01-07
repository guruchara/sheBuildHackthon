import { async } from '@firebase/util';
import * as actions from './actionTypes';

//sign up function
export const signUp = (userData)=>{
    return async(firebase, dispatch)=>{
        try{
            dispatch({type:actions.SIGN_UP_START});
            const {email, password} = userData;
            console.log("email is ", email);
            console.log("password is", password);
            console.log("Firebase is ", firebase);
            let user = await firebase.createUser({email, password}, {email});
            dispatch({type:actions.SIGN_UP_SUCCESS});
        }
        catch(e){
            dispatch({type:actions.SIGN_UP_FAIL, payload:e});
        }
    }
}

//Clear auth state function
export const clearAuthError = (dispatch)=>{
    dispatch({type:actions.CLEAR_AUTH_STATE});
}