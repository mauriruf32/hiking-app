import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mapa from '../../Components/Mapa/Mapa';
import Comments from "../../Components/Comments/Comments";

const DetailPage = () => {
    const { id } = useParams();
    const [hikingPlace, setHikingPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHikingPlace = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/hikingplaces/${id}`); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setHikingPlace(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHikingPlace();
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {hikingPlace ? (
                <div key={hikingPlace.id}>
                    <h1>Nombre: {hikingPlace.name}</h1>
                    <p>País: {hikingPlace.country}</p>
                    <p>Dificultad: {hikingPlace.difficulty}</p>
                    <p>Duración: {hikingPlace.duration}</p>
                    <Mapa lat={parseFloat(hikingPlace.lat)} lng={parseFloat(hikingPlace.lng)} />
                </div>
            ) : (
                <p>Sendero no encontrado</p>
            )}
            <Comments hikingId={hikingPlace ? hikingPlace.id : null} />
        </div>
    );
};

export default DetailPage;
