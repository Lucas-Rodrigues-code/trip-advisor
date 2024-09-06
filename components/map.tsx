import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";

import { Bounds, Coordinates } from "@/types";

type MapComponentProps = {
  setCoordinates: (coordinates: Coordinates) => void;
  setBounds: (bounds: Bounds) => void;
  coordinates: Coordinates;
  places: any[];
};

const MapComponent = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
}: MapComponentProps) => {
  const handleBoundsChanged = (event: MapCameraChangedEvent) => {
    const center = event.detail.center;
    const bounds = event.detail.bounds;
    if (center && bounds) {
      setCoordinates({ lat: center.lat, lng: center.lng });
      setBounds({
        ne: { lat: bounds.north, lng: bounds.east },
        sw: { lat: bounds.south, lng: bounds.west },
      });
    }
  };

  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
      <div className="h-[100vh] w-full">Google Maps API Key not found</div>
    );
  }
  return (
    <div className="h-[100vh] w-full">
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100vh" }}
          defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          onBoundsChanged={handleBoundsChanged}
        >
          {places.length > 0 &&
            places.map((place, index) => (
              <Marker
                position={{
                  lat: Number(place.latitude),
                  lng: Number(place.longitude),
                }}
              />
            ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
