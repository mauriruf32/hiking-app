import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart, AiOutlineComment } from "react-icons/ai";
import { useAuth } from '../../Context/AuthContext';

const Likes = ({ hikingId }) => {
    const [like, setLike] = useState(false);
    const [count, setCount] = useState(0);
    const { createLike, user, deleteLike } = useAuth();

    // Función para obtener los likes desde la API
    const fetchLikes = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/likes');
            const data = await response.json();
            // Filtra los likes para obtener solo los del hikingId correspondiente
            const hikingLikes = data.filter(like => like.hikingId === hikingId);
            setCount(hikingLikes.length); // Establece el conteo de likes
            // Verifica si el usuario actual ya ha dado like
            const userLike = hikingLikes.find(like => like.userId === user.id);
            setLike(!!userLike); // Establece el estado de like
        } catch (error) {
            console.error("Error fetching likes:", error);
        }
    };

    useEffect(() => {
        fetchLikes(); // Llama a la función al montar el componente
    }, [hikingId]); // Se vuelve a llamar si cambia hikingId

    const toggleLike = async () => {
        try {
            if (!like) {
                setLike(true);
                setCount(count + 1);
                // Crear el like en el backend
                const likeData = { userId: user.id, hikingId };
                await createLike(likeData); // Llama a la función createLike
            } else {
                setLike(false);
                setCount(count - 1);
                // Eliminar el like del backend
                await deleteLike(user.id, hikingId); // Llama a la función deleteLike
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div>
            <div className='card-footer fs-xl d-flex' style={{ justifyContent: "space-between" }}>
                <AiOutlineComment /> {" "}
                {like ? (
                    <AiFillHeart className='text-danger' onClick={toggleLike} />
                ) : (
                    <AiOutlineHeart onClick={toggleLike} />
                )} 
                {count}
            </div>
        </div>
    );
};

export default Likes;
