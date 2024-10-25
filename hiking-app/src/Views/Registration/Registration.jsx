import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from "./Registration.module.css"

const Registration = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signUp, isAuthenticated, errors: RegisterErrors  } = useAuth();
    const navigation = useNavigate();
 
    useEffect(() =>{
        if (isAuthenticated) navigation("/home");
    }, [isAuthenticated]);

    const onSubmit  = handleSubmit( async (values) => {
        signUp(values);
        }); 
        
  return (
    <div className={styles.formcontainer} >
        {
            RegisterErrors.map((error, i) => (
                <div key={i}>
                    {error}
                </div>
            ))
        }
<h1>REGISTRATE</h1>
        <form className={styles.form} onSubmit={onSubmit}>
            <h6>Nombre</h6>

            <input className={styles.inputs} type="text" {...register("firstName", {required: true})} placeholder='Name' />
            {errors.firstName && ( <p>Username is required</p> )}

            <h6>Email</h6>

            <input className={styles.inputs} type="email" {...register("email", {required: true})} placeholder='Email' />
            {errors.email && (<p>Email is required</p> )}

            <h6>Password</h6>
            <input className={styles.inputs} type="password" {...register("password", {required: true})} placeholder='Password' />
            {errors.password && (<p>Password is required</p> )}
            
            <button type='submit'>
                Registrar
            </button>
        </form>
        Ya tienes una cuenta?
        
        <Link to="/login">
        <button >LogIn</button>
        </Link>

    </div>
  )
}

export default Registration;