import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from "../../utils/LOGO.png"

import style from "./Form.module.css";

const LogIn = () => {
  const { register, handleSubmit, formState: {errors}, } = useForm();
  const { signIn, errors: signInErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data)=> {
    signIn(data);
    console.log(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated]);

  return (
    <div className={style.formcontainer}>
    <div  className={style.formRow}>
       {
        signInErrors.map((error, i) => (
          <div className={style.errors} key={i}>
            {error}
          </div>
        ))
       }
      <div className={style.formColumn1}>
       <img src={logo} style={{ width: "400px", height: "400px"}}/>

       </div>
       <div className={style.formColumn2}>
       <form  onSubmit={onSubmit}>
      <h1>Log In</h1>
          <div  >
            <h5>Email</h5>
            <input type="email" {...register("email", {required: true})} placeholder='Email' />
            {errors.email && (<p>Email is required</p> )}
      
          <h5>Password</h5>

            <input type="password" {...register("password", {required: true})} placeholder='Password' />
            {errors.password && (<p>Password is required</p> )}
          </div>

        <button type='submit'>
          Log In
        </button>
        <Link to="/register">
      No tienes una cuenta?
      Registrate
        </Link>
      </form>
        
      </div>
      


    </div>
    </div>

  )
}

export default LogIn;