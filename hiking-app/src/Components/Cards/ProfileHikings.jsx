import React from 'react';
import style from "./Cards.module.css";
import { useHikings } from '../../Context/HikingContext';
import { useAuth } from '../../Context/AuthContext';
import CardProfile from './CardProfile'; // Asegúrate de importar el componente CardProfile

const ProfileHikings = () => {
  const { hinkings } = useHikings(); // Asume que tienes una lista de hikings en el contexto
  const { user } = useAuth();

  // Filtrar hikings por userId
  const userHikings = hinkings.filter(hiking => hiking.userId === user.id);

  return (
    <div>
      {userHikings.length > 0 ? (
        userHikings.map(hiking => (
          <CardProfile key={hiking.id} hiking={hiking} />
        ))
      ) : (
        <p>Aun no has creado nigun sendero.</p>
      )}
    </div>
  );
};

export default ProfileHikings;
