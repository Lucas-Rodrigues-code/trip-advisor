import GoogleMapReact from "google-map-react";

import { Bounds, Coordinates } from "@/types";

type MapComponentProps = {
  setCoordinates: (coordinates: Coordinates) => void;
  setBounds: (bounds: Bounds) => void;
  coordinates: Coordinates;
};

const MapComponent = ({
  setCoordinates,
  setBounds,
  coordinates,
}: MapComponentProps) => {
  process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  console.log(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "process.env.GOOGLE_MAPS_API_KEY"
  );
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-[100vh] w-full">Google Maps API Key not found</div>
    );
  }
  return (
    <div className="h-[100vh] w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
        center={coordinates}
        defaultZoom={10}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {/* Child components, such as markers, info windows, etc. */}
      </GoogleMapReact>
    </div>
  );
};

export default MapComponent;
