import React, { useEffect } from 'react';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';

const CommentsSection = () => {
    const { getComments } = useAuth();
    const { hinkings } = useHikings();
useEffect(() => {
getComments();
}, [])
    

    return (
        <div>
            <h3>Comentarios</h3>
            <div>

            </div>
        </div>
    );
}

export default CommentsSection;
