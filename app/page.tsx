"use client";
import { useEffect, useState } from "react";

import Header from "@/components/header";
import Search from "@/components/search";
import MapComponent from "@/components/map";
import List from "@/components/list";
import Footer from "@/components/footer";
import { getPlacesData } from "@/api";
import { Bounds, Coordinates } from "@/types";
import { dataMock } from "@/mock";

export default function Home() {
  const [places, setPlaces] = useState(dataMock);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [bounds, setBounds] = useState<Bounds | null>(null);

  const [category, setCategory] = useState<string>("restaurants");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

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

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Search />
        <div className="flex flex-col md:flex-row">
          <List
            places={places?.length > 0 ? places : []}
            category={category}
            setCategory={setCategory}
          />
          {coordinates === null ? (
            <div className="h-[100vh] w-full">Loading...</div>
          ) : (
            <MapComponent
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={places?.length > 0 ? places : []}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
