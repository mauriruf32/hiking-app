
import React from 'react';
import FavoriteCard from '../../Components/Card/FavoriteCard';
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import styles from "./Favorites.module.css"

const Favorites  = () => {
    const { user, likes } = useAuth();
    const { hinkings } = useHikings();
    const userLikedHikings = hinkings.filter(hiking => hiking.id === likes.hikingId && user.id === likes.userId);

    return (
        <div className={styles.favoritecontainer} >
        Name: {user.firstName}
        ID: {user.id}
        <div >
        Favoritos
        </div>
        {userLikedHikings.length > 0 ? (
        userLikedHikings.map(hiking => (
          <FavoriteCard key={hiking.id} hiking={hiking} />
        ))
      ) : (
        <p>Aun no has likeado nigun sendero.</p>
      )}
          <FavoriteCard />
        
        </div>
    );
}

export default Favorites;