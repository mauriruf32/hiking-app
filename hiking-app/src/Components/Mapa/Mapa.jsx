import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Mapa.css";
import location from "../../imagenes/iconmonstr-location-1-32.png"

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
        <Marker  position={[lat, lng]} >

          {/* <Popup>
            {location}
          </Popup> */}
        </Marker>
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