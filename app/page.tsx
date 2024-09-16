"use client";
import { useEffect, useMemo, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

import Search from "@/components/search";
import MapComponent from "@/components/map";
import List from "@/components/list";
import { getPlacesData } from "@/api";
import { Bounds, Coordinates } from "@/types";
import { dataMock } from "../mock";
import useCurrentPosition from "@/hooks/current-position";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Home() {
  const [places, setPlaces] = useState(dataMock);
  const [selectedRatings, setSelectedRatings] = useState<number>(1);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  useCurrentPosition(setCoordinates);
  const [bounds, setBounds] = useState<Bounds | null>(null);

  const [category, setCategory] = useState<string>("restaurants");

  const handleRatingSelect = (rating: number) => {
    setSelectedRatings(rating);
  };

  const filteredPlaces = useMemo(() => {
    return places.filter(
      (item) => Math.floor(Number(item.rating)) >= selectedRatings
    );
  }, [places, selectedRatings]);

  useEffect(() => {
    /*   if (bounds && bounds.sw !== null && bounds.ne !== null) {
      getPlacesData(bounds.sw, bounds.ne, category)
        .then((data) => {
          setPlaces(dataMock);
        })
        .catch((error) => {
          console.error("Error fetching places data", error);
          setPlaces(dataMock);
        });
    } */
  }, [coordinates, bounds, category]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location) {
      setCoordinates({
        lat: selectedPlace.geometry?.location.lat(),
        lng: selectedPlace.geometry?.location.lng(),
      });
    }
  }, [selectedPlace]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <APIProvider apiKey={API_KEY ? API_KEY : ""}>
          <Search onPlaceSelect={setSelectedPlace} />
          <div className="flex flex-col md:flex-row h-full md:h-[80vh]">
            <List
              places={filteredPlaces?.length > 0 ? filteredPlaces : []}
              category={category}
              setCategory={setCategory}
              handleRatingSelect={handleRatingSelect}
              selectedRatings={selectedRatings}
            />
            {coordinates === null ? (
              <div className="h-[100vh] w-full flex justify-center items-center">
                Loading...
              </div>
            ) : (
              <MapComponent
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces?.length > 0 ? filteredPlaces : []}
              />
            )}
          </div>
        </APIProvider>
      </main>
    </div>
  );
}
