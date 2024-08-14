import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Spin } from 'antd';
import LoadingIcon from '../asset/icons/loading_bar.gif';

const MapComponent = ({ style, coordinates }) => {
  // Coordinates for Banilad
  const [isloaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false)
    }, 1500);
  }, [])

  return (
    <>
      {
        <Spin spinning={isloaded} style={style} indicator={
          <img src={LoadingIcon} alt="loading" style={{ width: '50px', height: '50px'}}/>
        }>
          {
            !isloaded && <MapContainer center={coordinates} zoom={13} className="MapContainer" style={style}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Circle
              center={coordinates}
              radius={1000} // Radius in meters
              color="#d90000"
              fillColor="#d90000"
              fillOpacity={0.3}
            />
          </MapContainer>
          }
        </Spin>
      }
    </>
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
