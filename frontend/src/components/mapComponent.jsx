import React from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const center = [10.3414, 123.9125]; // Coordinates for Banilad

  return (
    <MapContainer  center={center} zoom={13} className="MapContainer" style={{ height: "300px", width: "50%",borderRadius:"20px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Circle
        center={center}
        radius={1000} // Radius in meters
        color="blue"
        fillColor="blue"
        fillOpacity={0.3}
      />
    </MapContainer>
  );
}

export default MapComponent;



// import React from 'react';
// import { MapContainer, TileLayer, Circle } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

// const MapComponent = ({ position }) => {
//   return (
//     <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Circle
//         center={position}
//         radius={1000} // Radius in meters
//         color="blue"
//         fillColor="blue"
//         fillOpacity={0.3}
//       />
//     </MapContainer>
//   );
// }

// export default MapComponent;
