import * as actions from './actionTypes';
import { getAuth } from "firebase/auth";
import { async } from '@firebase/util';

//Adding doctor details list
export const addDoctorDetails = (doctorData)=>{
    return async(dispatch, firebase, firestore)=>{
        try{
            dispatch({type:actions.ADDING_DOCTOR_DETAILS_START});
            const {name, speciality, consultationFee, website, address, yearOfExp} = doctorData;
            
            //Getting current user
            const auth = getAuth();
            const doctor = auth.currentUser.email;
            const doctorId = auth.currentUser.uid;
            console.log("The current user email id and uid is", doctor, doctorId);
            
            let data = {
                name:name,
                speciality:speciality,
                consultationFee:consultationFee,
                website:website,
                address:address,
                yearOfExp:yearOfExp,
                doctorId:doctorId,
                created:firebase.firestore.FieldValue.serverTimestamp(),
                ratingArray: [0,0,0,0,0],
                finalRating:0,
            }

            //Now pushing this data into the database
            let result = await firestore.collection('doctors').add(data);
            dispatch({type:actions.ADDING_DOCTOR_DETAILS_SUCCESS})
        }
        catch(e){
            console.log("The error in adding the details of doctor is", e.message);
            dispatch({type:actions.ADDING_DOCTOR_DETAILS_FAIL, payload:e});
        }
    }
}

//Clear doctor details state function
export const clearDoctorState = (dispatch)=>{
    dispatch({type:actions.CLEAR_DOCTOR_DETAILS_STATE});
}

//adding the rating function
export const addRating = ({currentDoctorData, rating})=>{
    return async(firebase, firestore, dispatch)=>{
        try{
            dispatch({type:actions.ADDING_RATING_START});
            const docId = currentDoctorData?.doctorId;
            //calculating new rating
            const ratingArray = currentDoctorData?.ratingArray;
            const existingRating = currentDoctorData.finalRating;
            ratingArray[(rating-1)] += 1;
            let currRatingSum = 0;
            let totalSum = 0;
            for(let i = 0; i < 6; i++){
                currRatingSum += ratingArray[i]*(i+1);
                totalSum += ratingArray[i];
            }
            
            let newRating = ((currRatingSum)/totalSum);
            let finalNewRating = Math.round(newRating, 1);
            //update rating in doctors doc
            let result = await firestore.collection('doctors').doc(docId).update({
                ...currentDoctorData,
                finalRating:finalNewRating,
                ratingArray:ratingArray
            })
            dispatch({type:actions.ADDING_RATING_SUCCESS});
        }
        catch(e){
            console.log("The error in adding rating", e.message);
            dispatch({type:actions.ADDING_RATING_FAIL, payload:e});
        }
    }  
}