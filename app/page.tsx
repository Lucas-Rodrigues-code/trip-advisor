"use client";
import { useEffect, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";

import Search from "@/components/search";
import MapComponent from "@/components/map";
import List from "@/components/list";
import { getPlacesData } from "@/api";
import { Bounds, Coordinates, Place } from "@/types";
import useCurrentPosition from "@/hooks/current-position";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function Home() {
  const [places, setPlaces]: any[] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState<any[]>([]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [selectedRatings, setSelectedRatings] = useState<number>(1);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [bounds, setBounds] = useState<Bounds | null>(null);

  const [category, setCategory] = useState<string>("");

  useCurrentPosition(setCoordinates);

  const handleRatingSelect = (rating: number) => {
    setSelectedRatings(rating);
  };

  useEffect(() => {
    const filerData = places.filter(
      (item: any) => Math.floor(Number(item.rating)) >= selectedRatings
    );
    setFilteredPlaces(filerData);
  }, [selectedRatings]);

  useEffect(() => {
    if (bounds && bounds.sw !== null && bounds.ne !== null) {
      getPlacesData(bounds.sw, bounds.ne, category)
        .then((data) => {
          if (data) {
            const place: Place[] = data
              .map((item: Place) => {
                return {
                  name: item.name,
                  rating: item.rating,
                  photo: item.photo,
                  description: item.description,
                  address: item.address,
                  phone: item.phone,
                  price: item.price,
                  cuisine: item.cuisine,
                  website: item.website,
                  web_url: item.web_url,
                  latitude: item.latitude,
                  longitude: item.longitude,
                };
              })
              .filter((item: any) => item.name !== undefined);
            setFilteredPlaces([]);
            setPlaces(place);
          }
        })
        .catch((error) => {
          console.error("Error fetching places data", error);
          setPlaces([]);
        });
    }
  }, [category]);

  useEffect(() => {
    if (selectedPlace && selectedPlace.geometry?.location) {
      setCoordinates({
        lat: selectedPlace.geometry?.location.lat(),
        lng: selectedPlace.geometry?.location.lng(),
      });
      setCategory("");
      setPlaces([]);
    }
  }, [selectedPlace]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <APIProvider apiKey={API_KEY ? API_KEY : ""}>
          <Search onPlaceSelect={setSelectedPlace} />
          <div className="flex flex-col md:flex-row h-full md:h-[80vh]">
            <List
              places={filteredPlaces.length ? filteredPlaces : places}
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
                places={filteredPlaces.length ? filteredPlaces : places}
              />
            )}
          </div>
        </APIProvider>
      </main>
    </div>
  );
}
