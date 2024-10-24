import { useForm } from 'react-hook-form';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';

const Comments = () => {
    const { register, handleSubmit, setError } = useForm(); 
    const { hinkings } = useHikings();
    const { createComment, user } = useAuth(); // Obtener el usuario actual

    const onSubmit = handleSubmit((data) => {
        // Añadir el userId y el hikingId al objeto de datos
        const comment = { ...data, userId: user.id, hikingId: hinkings.id };
        createComment(comment);
      });

  return (
    <div>
        <form onSubmit={onSubmit}>
        <input 
          type='text' 
          placeholder='Comentario'
          {...register("description")}
          autoFocus
        />
        <button type='submit'>
          Save
        </button>
        </form>

    </div>
  )
}

export default Comments;