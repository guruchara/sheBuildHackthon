import { async } from '@firebase/util';
import * as actions from './actionTypes';
import { getAuth } from "firebase/auth";

//sign up function
export const signUp = (userData)=>{
    return async(firebase, dispatch)=>{
        try{
            dispatch({type:actions.SIGN_UP_START});
            const {email, password} = userData;
            let user = await firebase.createUser({email, password}, {email});
            dispatch({type:actions.SIGN_UP_SUCCESS});
        }
        catch(e){
            dispatch({type:actions.SIGN_UP_FAIL, payload:e});
        }
    }
}

//sign in Actions
export const signIn = (credentials)=>{
    return async(firebase, dispatch)=>{
        try{
            dispatch({type:actions.SIGN_IN_START});
            let result = await firebase.login(credentials);
            console.log("The result of signIn is", result);
            dispatch({type:actions.SIGN_IN_SUCCESS});
        }
        catch(e){
            dispatch({type:actions.SIGN_IN_FAIL, payload:e});
        }
    }
}

//Clear auth state function
export const clearAuthError = (dispatch)=>{
    dispatch({type:actions.CLEAR_AUTH_STATE});
}

//signOut Function
export const signOut = ()=>{
    return async(firebase, dispatch)=>{
        try{
            dispatch({type:actions.CLEAR_AUTH_STATE});
            await firebase.logout();
            window.location.reload();
        }
        catch(e){
            console.log(e.message);
        }
    }
}

// set if the user is a doctor
export const isDoctor = (doctor)=>{
    return async(firebase, firestore, dispatch)=>{
    try{
        const auth = getAuth();
        const userId = auth.currentUser.uid;
        dispatch({type:actions.SET_DOCTOR_STATUS_START})
        if(doctor){
            let result = await firestore.collection('users').doc(userId).update({
                ...auth.currentUser,
                isDoctor:true,
            })
            dispatch({type:actions.SET_DOCTOR_STATUS_SUCCESS})
        }
        else{
            let result = await firestore.collection('users').doc(userId).update({
                ...auth.currentUser,
                isDoctor:false,
            })
            dispatch({type:actions.SET_DOCTOR_STATUS_SUCCESS})
        }
    }
    catch(e){
        dispatch({type:actions.SET_DOCTOR_STATUS_FAIL, payload:e});
    }
}
    
}