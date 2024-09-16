import {
  InfoWindow,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";

import { Bounds, Coordinates } from "@/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import useMediaQuery from "@/hooks";

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
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  return (
    <div className="w-full h-[800px] md:h-full px-3 md:px-0">
      <Map
        style={{ width: "100%", height: "100%" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={12}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onBoundsChanged={handleBoundsChanged}
      >
        {places.length > 0 &&
          places.map((place, index) =>
            isDesktop ? (
              <InfoWindow
                key={index}
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
            ) : (
              <Marker
                key={index}
                position={{
                  lat: Number(place.latitude),
                  lng: Number(place.longitude),
                }}
              />
            )
          )}
      </Map>
    </div>
  );
};

export default MapComponent;
