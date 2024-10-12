import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from "react-router-dom";

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
    <div className='register'>
        {
            RegisterErrors.map((error, i) => (
                <div key={i}>
                    {error}
                </div>
            ))
        }

        <form onSubmit={onSubmit}>

            <input type="text" {...register("firstName", {required: true})} placeholder='Name' />
            {errors.firstName && ( <p>Username is required</p> )}

            <input type="email" {...register("email", {required: true})} placeholder='Email' />
            {errors.email && (<p>Email is required</p> )}

            <input type="password" {...register("password", {required: true})} placeholder='Password' />
            {errors.password && (<p>Password is required</p> )}
            
            <button type='submit'>
                Register
            </button>
        </form>
    </div>
  )
}

export default Registration;