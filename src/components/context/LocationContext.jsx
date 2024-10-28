import { createContext, useState } from "react";

export const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const getLatAndLng = (lat, lng) => {
    setLat(lat);
    setLng(lng);
  };

  return (
    <LocationContext.Provider value={{ getLatAndLng, lat, lng }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
