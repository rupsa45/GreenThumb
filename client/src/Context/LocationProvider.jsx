import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [state, setState] = useState("");
  const [crop, setCrop] = useState("");   // e.g., "Wheat"

  return (
    <LocationContext.Provider value={{ state, setState, crop, setCrop }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
