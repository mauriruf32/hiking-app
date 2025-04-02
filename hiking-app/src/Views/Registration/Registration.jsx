import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import styles from "./Registration.module.css";
import logo from "../../utils/LOGO.png";

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
    <div>
 <div className={styles.formRow}> 
          <div className={styles.formColumn1}>
       <img src={logo}  style={{ width: "400px", height: "400px"}}/>

       </div>
    <div className={styles.formColumn2} >
    <h1>REGISTRATE</h1>

        {
            RegisterErrors.map((error, i) => (
                <div className={styles.errors} key={i}>
                    {error}
                </div>
            ))
        }
        <form  onSubmit={onSubmit}>
            <div>
            <h6>Nombre</h6>
            
            <input className={styles.inputs} type="text" {...register("firstName", {required: true})} placeholder='Name' />
            {errors.firstName && ( <p>Name is required</p> )}

            <h6>Email</h6>

            <input className={styles.inputs} type="email" {...register("email", {required: true})} placeholder='Email' />
            {errors.email && (<p>Email is required</p> )}

            <h6>Password</h6>
            <input className={styles.inputs} type="password" {...register("password", {required: true})} placeholder='Password' />
            {errors.password && (<p>Password is required</p> )}
            
            </div>
            
            <button  type='submit'>
               <p>Registrate</p>
            </button>
        </form>
        <Link to="/login">
        Ya tienes una cuenta? Click Aqui! 
        </Link>

    </div>
    </div>
    </div>
   

  )
}

export default Registration;