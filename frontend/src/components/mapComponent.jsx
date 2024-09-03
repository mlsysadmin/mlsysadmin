import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Spin } from "antd";
import LoadingIcon from "../asset/icons/loading_bar.gif";
import { LocationFormatter } from "../utils/LocationDateFormatter";
import "../styles/map.css";
const MapComponent = ({ style, oneListing }) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [coordinates, setCoordinates] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCoordinates = async () => {
      const formattedLocation = LocationFormatter(oneListing.listings.location);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            formattedLocation
          )}&format=json&addressdetails=1`
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        } else {
          setError("No results found");
        }
      } catch (err) {
        setError("An error occurred");
      } finally {
        setIsLoaded(false);
      }
    };

    fetchCoordinates();
  }, [oneListing.listings.location]);

  return (
    <>
      <Spin
        spinning={isLoaded}
        style={style}
        indicator={
          <img
            src={LoadingIcon}
            alt="loading"
            style={{ width: "50px", height: "50px" }}
          />
        }
      >
        {!isLoaded && (
          <>
            {error && <p>{error}</p>}
            <MapContainer
              center={coordinates}
              zoom={13}
              className="MapContainer"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Circle
                center={coordinates}
                radius={1000}
                color="rgb(4, 0, 217, 97%)"
                fillColor="rgb(17 0 217 24%)"
                fillOpacity={0.3}
              />
            </MapContainer>
          </>
        )}
      </Spin>
    </>
  );
};

export default MapComponent;
