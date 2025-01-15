import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProfileForm.module.css";


const ProfileForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { getUserProfile, errors: RegisterErrors, updateUserProfile  } = useAuth();
    const params = useParams();
    const navigate = useNavigate();

        const onSubmit = handleSubmit((data) => {
            if (params.id) {
                updateUserProfile(params.id, data);
            };
            navigate("/profile")
        });

        useEffect(() => {
            async function loadProfile() {
            if (params.id) {
             const profile = await getUserProfile(params.id);
              setValue('firstName', profile.firstName)
              setValue('lastName', profile.lastName)
              setValue('birthDate', profile.birthDate)
              setValue('phoneNumber', profile.phoneNumber)
              setValue('email', profile.email)
              setValue('password', profile.password)
            //   setValue('image', profile.image)
            }
          }
          loadProfile()
        }, []);

  return (
    <div>
 <div > 

    <div  >
        {
            RegisterErrors.map((error, i) => (
                <div  key={i}>
                    {error}
                </div>
            ))
        }
            <h1>Editar datos</h1>
        <form  onSubmit={onSubmit}>
            <h6>Nombre</h6>

            <input className={styles.inputs} type="text" {...register("firstName", {required: true})} placeholder='Name' />
            {errors.firstName && ( <p>Name is required</p> )}

            <h6>Apellido</h6>

            <input className={styles.inputs} type="text" {...register("lastName", {required: true})} placeholder='Last Name' />
            {errors.lastName && (<p>Last Name is required</p> )}
            
            <h6>Telefono</h6>

            <input className={styles.inputs} type="text" {...register("phoneNumber", {required: true})} placeholder='Phone Number' />
            {errors.phoneNumber && ( <p>Phone Number is required</p> )}

            <h6>Email</h6>

            <input className={styles.inputs} type="email" {...register("email", {required: true})} placeholder='Email' />
            {errors.email && (<p>Email is required</p> )}

            {/* <h6>Password</h6>
            <input className={styles.inputs} type="password" {...register("password", {required: true})} placeholder='Password' />
            {errors.password && (<p>Password is required</p> )} */}
            <br/>
            <button type='submit'>
               <p>Guardar</p>
            </button>
        </form>
    </div>
    </div>
    </div>
   

  )
}

export default ProfileForm;