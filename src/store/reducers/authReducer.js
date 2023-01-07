import * as actions from './../actions/actionTypes';

const initialState = {
    loading:false,
    error:null
};

const authReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case actions.CLEAR_AUTH_STATE:
        case actions.CLEAR_DOCTOR_DETAILS_STATE:    
            return{
                initialState
            }
        case actions.SIGN_UP_START:
        case actions.SIGN_IN_START:
        case actions.ADDING_DOCTOR_DETAILS_START:
        case actions.ADDING_RATING_START:
            return{
                ...state,
                loading:true,
                error:null,
            };

        case actions.SIGN_UP_SUCCESS:
        case actions.SIGN_IN_SUCCESS:
        case actions.ADDING_DOCTOR_DETAILS_SUCCESS:
        case actions.ADDING_RATING_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
            }

        case actions.SIGN_UP_FAIL:
        case actions.SIGN_IN_FAIL:
        case actions.ADDING_DOCTOR_DETAILS_FAIL:
        case actions.ADDING_RATING_SUCCESS:
            return{
                ...state,
                loading:false,
                error:payload,
            }

        default:
            return state;
    }
}

export default authReducer;