import React from 'react';
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./Mapa.css";
import 'leaflet/dist/leaflet.css';
import iconUrl from "../../imagenes/icons8-trekking-50.png"

export const newicon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  iconSize: [30, 35]
});
const Mapa = ({ lat, lng, Sendero }) => {
  
  return (
    <div className="map-container">
      <MapContainer 
        center={[lat, lng]} 
        zoom={10} 
        style={{ height: "200px", width: "250px", margin:"15px"  }}
      >
        <TileLayer 
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker  position={[lat, lng]} icon={newicon} />
      </MapContainer>
    </div>
  );
};

export default Mapa;

