import * as actions from './../actions/actionTypes';

const initialState = {
    loading:false,
    error:null
};

const authReducer = (state=initialState, {type, payload})=>{
    switch(type){
        case actions.CLEAR_AUTH_STATE:
            return{
                initialState
            }
        case actions.SIGN_UP_START:
            return{
                ...state,
                loading:true,
                error:null,
            };

        case actions.SIGN_UP_SUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
            }

        case actions.SIGN_UP_FAIL:
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