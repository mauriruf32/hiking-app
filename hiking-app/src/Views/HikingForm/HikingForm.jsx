import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import styles from "./HikingForm.module.css";

function HikingForm() {
  const { register, handleSubmit, setError } = useForm(); 
  const { createHiking } = useHikings();
  const { user } = useAuth(); // Obtener el usuario actual
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    // Añadir el userId al objeto de datos
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
          type='text' 
          placeholder='Image'
          {...register("image")}
        />        
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
          {...register("lat", { required: true, validate: validateNumber  })}
        />
        <input 
        className={styles.input} 
          type='text' 
          placeholder='Longitude'
          {...register("lng", { required: true, validate: validateNumber  })}
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
