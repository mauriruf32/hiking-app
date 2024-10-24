import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import styles from "./HikingForm.module.css";
import React, { useState } from 'react';

function HikingForm() {
    const preset_name = "jvu2gwik";
    const cloud_name = "djsqt7j6v";
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue, setError } = useForm();
    const { createHiking } = useHikings();
    const { user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        const hikingData = { ...data, userId: user.id };
        createHiking(hikingData);
        navigate('/home');
    });

    const validateNumber = (value) => {
        const regex = /^-?\d+([.,]\d+)?$/;
        if (!regex.test(value)) {
            setError("duration", {
                type: "manual",
                message: "Por favor ingresa un número válido.",
            });
            return false;
        }
        return true;
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data
            });

            const file = await response.json();
            setValue("image", file.secure_url); // Actualiza el valor del input "image" en el formulario
            setLoading(false);
        } catch (error) {
            console.error('Error uploading image:', error);
            setLoading(false);
        }
    }

    return (
        <div className={styles.formcontainer}>
            <form onSubmit={onSubmit}>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Name'
                    {...register("name")}
                    autoFocus
                />
                <input
                    className={styles.input}
                    type='file'
                    accept="image/*" // Permitir solo imágenes
                    onChange={uploadImage} // Llama a uploadImage al seleccionar un archivo
                />
                {loading && <p>Uploading image...</p>} {/* Mensaje de carga */}

                <input
                    className={styles.input}
                    type='text'
                    placeholder='Duration'
                    {...register("duration", {
                        required: true,
                        validate: validateNumber
                    })}
                />
                <select {...register("difficulty")}
                    className={styles.input}
                    required>
                    <option value="">Select Difficulty</option>
                    <option value="Facil">Facil</option>
                    <option value="Moderado">Moderado</option>
                    <option value="Dificil">Dificil</option>
                    <option value="Muy Dificil">Muy Dificil</option>
                </select>
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Latitude'
                    {...register("lat", { required: true, validate: validateNumber })}
                />
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Longitude'
                    {...register("lng", { required: true, validate: validateNumber })}
                />
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Country'
                    {...register("country")}
                    required
                />
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Flag'
                    {...register("flag")}
                />
                <input
                    className={styles.input}
                    type='text'
                    placeholder='Continent'
                    {...register("continent")}
                    required
                />
                
                <button type='submit'>
                    Save
                </button>
            </form>
        </div>
    );
}

export default HikingForm;
