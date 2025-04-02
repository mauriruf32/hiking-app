import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "../../Components/Comments/Comments";
import style from "./DetailPage.module.css";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'; 
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";
import iconUrl from "../../imagenes/icons8-trekking-50.png"

export const newicon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  iconSize: [30, 35]
});


const DetailPage = () => {
  const { id } = useParams();
  const [hikingPlace, setHikingPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupCoordinates, setPopupCoordinates] = useState(null); 

  useEffect(() => {
    const fetchHikingPlace = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/hikingplaces/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

      const handleMapClick = (e) => {
          const { lat, lng } = e.latlng;
  
          setPopupCoordinates({ lat, lng });
      };
  
      const MapEventsHandler = (e) => {
          useMapEvents({
              click: (e) => handleMapClick(e),
          });
          return null;
      };

  return (
    <div className={style.container}>
      <h1>{hikingPlace.name}</h1>

      <div className={style.detailContainer}>
        <div className={style.imageContainer}>
          <img className={style.imagen} src={hikingPlace.image} alt={hikingPlace.name} />
        </div>

        <div className={style.infoContainer}>
          <MapContainer 
          center={[hikingPlace.lat, hikingPlace.lng]}  
          zoom={13} 
          style={{ height: "300px", width: "400px", borderRadius: "10px", marginTop:"-1px"}}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapEventsHandler handleMapClick={handleMapClick} />
            {popupCoordinates && (
                <Marker position={[hikingPlace.lat, hikingPlace.lng]} icon={newicon}>
                    <Popup>
                        <h6>
                            Coordenadas: {hikingPlace.lat}, {hikingPlace.lng}
                        </h6>
                    </Popup>
                </Marker>
            )}
            </MapContainer>

        </div>
      </div>
        <div className={style.infoText}>
            <h4><strong>Pais: </strong>{hikingPlace.country}</h4>
            <h4><strong>Dificultad: </strong> {hikingPlace.difficulty}</h4>
            <h4><strong>Duración en horas: </strong> {hikingPlace.duration}hs</h4>
        </div>
      <Comments hikingId={hikingPlace?.id} />
    </div>
  );
};

export default DetailPage;
