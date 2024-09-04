"use client";
import Header from "@/components/header";
import Search from "@/components/search";

import MapComponent from "@/components/map";
import List from "@/components/list";
import Footer from "@/components/footer";
import { getPlacesData } from "@/api";
import { useEffect, useState } from "react";


type Coordinates = {
  lat: number;
  lng: number;
};

type Bounds = {
  sw: Coordinates;
  ne: Coordinates;
};

export default function Home() {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState<Bounds | null>(null);
  console.log(places, "places");
  const [categories, setCategories] = useState("restaurants");
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds && bounds.sw !== null && bounds.ne !== null) {
      getPlacesData(bounds.sw, bounds.ne,categories).then((data) => {
        
        setPlaces(data);
      });
    }
  }, [coordinates, bounds,categories]);
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <Header />
      <main className="flex-1">
        <Search />
        <div className="flex flex-col md:flex-row">
          <List places={places} categories={categories} setCategories={setCategories} />
          <MapComponent
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
