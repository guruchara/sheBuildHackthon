import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from './firebase.module.css'
import simple from '../assests/simple.png'
import { signUp, clearAuthError } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";

const Fireauth = () => {
    const { register, handleSubmit, watch, reset, onChange, formState: { errors } } = useForm({ mode: 'onChange', shouldUseNativeValidation: true, reValidateMode: 'onChange', });
    const firebase =useFirebase();
    const dispatch = useDispatch();
    // const [password, setPassword] = useState(initialState);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('')

    const onSubmit = async (data) => {


        await signUp(data)(firebase, dispatch)
        // let ans = await auth.createUserWithEmailAndPassword(data?.email, data?.password)
        // console.log("ans20", ans)

        // if (!ans && !Object.keys(ans)) {
        //     let res = await auth.signInWithEmailAndPassword(data.email, data.password)

        // }

        // console.log("res19",res)

        reset();
    }

    // const logout = () => {
    //     auth.signOut();
    // }
    const handleOnlyNumber = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
        }

    }

    //Clear the states in auth reducer
    useEffect(()=>{
        clearAuthError(dispatch);
      }, []);

    return (
        <div className={styles.mainContainer}>

            <div className={styles.main}>
                {/* {user !== null ? <p>guru</p> : */}
                <div className={styles.imgContainer}>
                    <img src={simple} alt="loginImg"></img>
                </div>
                <div className={styles.rectangleForm}>
                    <div className={styles.formContainer}>
                        <div className={styles.enquiryText}>
                            <h2>Sign up</h2>
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input type="text" name="Namw" className={styles.inputBox} onChange={(e) => setEmail(e.target.value)} placeholder="please enter your name"  {...register("name")} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email id</label>
                            <input type="text" name="email" className={styles.inputBox} onChange={(e) => setEmail(e.target.value)} placeholder="email id"  {...register("email")} />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="pincode" onChange={(e) => setPassword(e.target.value)} className={styles.inputBox} placeholder="please enter password" {...register("password")} />
                        </div>
{/* hackathon */}
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.requestCallButton} >
                                <button>Sign Up</button>
                            </div>

                        </form>
                    </div>

                </div>
                {/* } */}





            </div>
        </div >
    )
}

export default Fireauth;