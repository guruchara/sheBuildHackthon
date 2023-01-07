import React from 'react'
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    authReducer:authReducer,
    firebaseReducer:firebaseReducer,
    firestoreReducer:firestoreReducer,
})

export default rootReducer;