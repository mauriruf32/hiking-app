import React from 'react';
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "./Mapa.css";
import 'leaflet/dist/leaflet.css';
import iconUrl from "../../imagenes/iconmonstr-location-1-32.png"
export const newicon = new Leaflet.Icon({
  iconUrl,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55]
});
const Mapa = ({ lat, lng, Sendero }) => {
  
  return (
    <div className="map-container">
      <MapContainer 
        center={[lat, lng]} 
        zoom={10} 
        style={{ height: "400px", width: "100%" }}
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


// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "./Mapa.css";

// const Mapa = () => {



//   return (
//     <div>
//         <MapContainer 
//             center={{ lat:"42.188263211959764", lng:"-7.720515648604049" }} 
//             zoom={10}
//         >
//             <TileLayer 
//                 url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />

//         </MapContainer>
//     </div>
//   )
// }

// export default Mapa;