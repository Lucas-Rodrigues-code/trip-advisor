import { useEffect } from "react";
import { Coordinates } from "@/types";

const useCurrentPosition = (
  setCoordinates: (coordinates: Coordinates) => void
): void => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);
};

export default useCurrentPosition;
