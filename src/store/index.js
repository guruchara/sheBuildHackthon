import React from 'react'
import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import rootReducer from './reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import firebase from './../config';
import { createFirestoreInstance, getFirestore } from 'redux-firestore'
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase'
import _ from "lodash";

const middlewares = [
    thunk.withExtraArgument(getFirebase, getFirestore)
  ]
  const middlewareEnhancer = applyMiddleware(...middlewares)
  const composedEnhancers = compose(middlewareEnhancer)

const rrfConfig = {
    userProfile:'users',
    useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
    attachAuthIsReady: true,
    profileFactory: (userData, profileData, firebase) =>{
        const email = _.get(userData,"user.email", false);
        const uid = _.get(userData, "user.uid", false);
        return{
            email:email,
            uid:uid,
            displayName:((email+"").substring(0, (email+"").indexOf('@'))),
            photoURL:((email+"").substring(0,1).toUpperCase()),
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        }
    }
} 
const store = configureStore({reducer: rootReducer, devTools:composeWithDevTools(), enhancers:composedEnhancers });
export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export default store;