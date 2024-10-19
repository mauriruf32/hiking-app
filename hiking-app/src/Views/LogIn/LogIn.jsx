import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";
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
    <div className={style.form}>
       {
        signInErrors.map((error, i) => (
          <div className={style.errors} key={i}>
            {error}
          </div>
        ))
       }
      <h1>Log In</h1>
      <form onSubmit={onSubmit}>

          <div className={style.inputbox}>
            <input type="email" {...register("email", {required: true})} placeholder='Email' />
            {errors.email && (<p>Email is required</p> )}
          </div>

          <div className={style.inputbox}>
            <input type="password" {...register("password", {required: true})} placeholder='Password' />
            {errors.password && (<p>Password is required</p> )}
          </div>

        <button type='submit'>
          Log In
        </button>
      </form>
    </div>
  )
}

export default LogIn;