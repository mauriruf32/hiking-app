import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../Context/AuthContext';

const Comments = ({ hikingId }) => {
    const { register, handleSubmit, reset } = useForm();
    const { createComment, user } = useAuth();
    const [comments, setComments] = useState([]);

    // Función para obtener los comentarios desde la API
    const fetchComments = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/comments');
            const data = await response.json();
            const filteredComments = data.filter(comment => comment.hikingId === hikingId);
            setComments(filteredComments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [hikingId]);

    // Manejar el envío del formulario
    const onSubmit = handleSubmit(async (data) => {
        const comment = { ...data, userId: user.id, hikingId };

        try {
            await createComment(comment);
            reset(); // Limpia el formulario después de enviar
            fetchComments(); // Vuelve a obtener los comentarios actualizados
        } catch (error) {
            console.error('Error creating comment:', error);
        }
    });

    return (
        <div>
            {comments.map((c) => (
                <div key={c.id}>
                    <h2>{c.description}</h2>
                    <p>Por userId: {c.userId}</p>
                </div>
            ))}

            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder='Comentario'
                    {...register("description", { required: true })}
                    autoFocus
                />
                <button type='submit'>
                    Save
                </button>
            </form>
        </div>
    );
};

export default Comments;




// import { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useAuth } from '../../Context/AuthContext';

// const Comments = ({ hikingId }) => {
//     const { register, handleSubmit } = useForm();
//     const { createComment, user } = useAuth();
//     const [comments, setComments] = useState([]);


    

//     useEffect(() => {
//         const fetchComments = async () => {
//             try {
//                 const response = await fetch('http://localhost:3001/api/comments');
//                 const data = await response.json();
//                 const filteredComments = data.filter(comment => comment.hikingId === hikingId);
//                 setComments(filteredComments);
//             } catch (error) {
//                 console.error('Error fetching comments:', error);
//             }
//         };

//         fetchComments();
//     }, [hikingId]); 

//     const onSubmit = handleSubmit((data) => {
//         const comment = { ...data, userId: user.id, hikingId };
//         createComment(comment);
//     });

//     return (
//         <div>
//             {comments.map((c) => (
//                 <div key={c.id}>
//                     <h2>{c.description}</h2>
//                     <p>Por userId: {c.userId}</p>
//                 </div>
//             ))}

//             <form onSubmit={onSubmit}>
//                 <input
//                     type='text'
//                     placeholder='Comentario'
//                     {...register("description")}
//                     autoFocus
//                 />
//                 <button type='submit'>
//                     Save
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default Comments;
