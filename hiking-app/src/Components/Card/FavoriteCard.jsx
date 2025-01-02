import React from 'react';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import Likes from '../Comments/Likes';


const FavoriteCard  = () => {
 const { user, likes } = useAuth();
 const { hinkings } = useHikings();

 

  return (
    <div >
      {
        hinkings.map((hiking) => (
          <div>{hiking.id}

          {hiking.name}

          </div>
        ))}
        {
          likes.map((like) => (
            <div>
            <div>user:{like.userId}</div>
            <div>hiking:{like.hikingId}</div>
            </div>

        ))}

    </div>
  );
}

export default FavoriteCard;