import {
  APIProvider,
  InfoWindow,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";

import { Bounds, Coordinates } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

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
            places.map(
              (place, index) => (
                console.log(place),
                (
                  <InfoWindow
                    position={{
                      lat: Number(place.latitude),
                      lng: Number(place.longitude),
                    }}
                  >
                    <Card className="w-[150px] h-[100%] overflow-hidden">
                      <Image
                        alt="Card image"
                        width={100}
                        height={50}
                        src={place.photo?.images?.small?.url}
                        className="w-full object-cover"
                      />

                      <CardHeader className="p-1">
                        <CardTitle className="text-base">{place?.name}</CardTitle>
                        <CardDescription className="text-xs">
                        {place?.description}
                        </CardDescription>
                      </CardHeader> 
                    </Card>
                  </InfoWindow>
                )
              )
            )}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
