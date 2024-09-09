"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import PlaceCard from "./place-card";

export function StarRating({
  rating,
  onSelect,
  selectedRating,
}: {
  rating: number;
  onSelect: (rating: number) => void;
  selectedRating: number;
}) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= (selectedRating || rating)
              ? "text-yellow-400"
              : "text-muted-foreground"
          } hover:text-yellow-400 transition-colors`}
          onClick={() => onSelect(star)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSelect(star);
            }
          }}
          tabIndex={0}
          role="button"
          aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
        />
      ))}
    </div>
  );
}

type ListProps = {
  places: any[];
  category: string;
  setCategory: (category: string) => void;
};
export default function List({ places, category, setCategory }: ListProps) {
  const [selectedRatings, setSelectedRatings] = useState<number>(5);

  const handleRatingSelect = (rating: number) => {
    setSelectedRatings(rating);
  };
  
  const filteredPlaces = places?.filter((item: any) => {
    return (
      Math.floor(Number(item.rating)) >= selectedRatings &&
      item.category?.key === category.slice(0, -1)
    );
  });

  return (
    <Tabs
      defaultValue="restaurants"
      className="w-full h-[100vh] max-w-2xl mx-auto p-3 mb-11"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger
          value={"restaurants"}
          onClick={() => setCategory("restaurants")}
        >
          Restaurantes
        </TabsTrigger>
        <TabsTrigger value={"hotels"} onClick={() => setCategory("hotels")}>
          Hotels
        </TabsTrigger>
        <TabsTrigger
          value={"attractions"}
          onClick={() => setCategory("attractions")}
        >
          Atrações
        </TabsTrigger>
      </TabsList>
      <TabsContent value={category} className="h-[90vh] overflow-auto">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Filtrar por avaliação:</h2>
          <StarRating
            rating={5}
            onSelect={(rating) => handleRatingSelect(rating)}
            selectedRating={selectedRatings || 0}
          />
        </div>
        <div className="space-y-4">
          {filteredPlaces.length === 0 && (
            <div className="text-center text-muted-foreground">
              No places found
            </div>
          )}
          {filteredPlaces.length > 0 &&
            filteredPlaces.map((place: any, i: number) => (
              <PlaceCard place={place} key={i} />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
