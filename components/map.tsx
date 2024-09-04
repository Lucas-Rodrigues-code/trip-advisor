import GoogleMapReact from "google-map-react";

type MapComponentProps = {
  setCoordinates: (coordinates: any) => void;
  setBounds: (bounds: any) => void;
  coordinates: any;
};

const MapComponent = ({
  setCoordinates,
  setBounds,
  coordinates,
}: MapComponentProps) => {
  return (
    <div className="h-[100vh] w-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDKwa0QEaeJ4reYX5M_DqrXOa7TA8Q2svM" }}
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
