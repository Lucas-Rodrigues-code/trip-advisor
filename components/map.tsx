"use client";
import React, { createContext } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const MapComponent = () => {
  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyDKwa0QEaeJ4reYX5M_DqrXOa7TA8Q2svM">
        <GoogleMap
          mapContainerStyle={{ height: "600px", width: "100%" }}
          center={{ lat: -3.745, lng: -38.523 }}
          zoom={10}
        >
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapComponent;
