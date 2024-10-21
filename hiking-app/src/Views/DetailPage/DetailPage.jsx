import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHikings } from '../../Context/HikingContext';
import Mapa from "../../Components/Mapa/Mapa";


const DetailPage = () => {
  const { id } = useParams();

    const { getHikingPlaceById, hinkings } = useHikings();

    useEffect(() =>{
        getHikingPlaceById(id);
    }, [])


    return (
        <div>
            <h2>Detalles de la Caminata</h2>
            <div>Nombre: {hinkings.name}</div>

            <div>Descripción: {hinkings.country}</div>
            <div>Dificultad: {hinkings.difficulty}</div>
            <div>Duración: {hinkings.duration}</div>
            <div>          <Mapa lat={parseFloat(hinkings.lat)} lng={parseFloat(hinkings.lng)} />
            </div>
                        {/* Agrega más campos según lo que tengas disponible en el objeto hiking */}
        </div>
    );
};

export default DetailPage;
