"use client";

import { useState } from "react";
import { ChevronDown, Loader, Search, Star } from "lucide-react";

import PlaceCard from "./place-card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingSpinner from "./loading";

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
  handleRatingSelect: (rating: number) => void;
  selectedRatings: number;
  loading: boolean;
  search: () => void;
};

export default function List({
  places,
  category,
  setCategory,
  handleRatingSelect,
  selectedRatings,
  loading,
  search,
}: ListProps) {
  const [ranking, setRanking] = useState<number>(0);

  return (
    <div className="w-full max-w-2xl mx-auto p-3 mb-11 overflow-auto ">
      <div className="p-4 space-y-4 ">
        <h2 className="text-2xl font-bold">Filtros</h2>

        <div className="flex justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tipo de Lugar</h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between">
                  {category || "Selecionar Tipo"}
                  <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Tipos de Lugar</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={category}
                  onValueChange={setCategory}
                >
                  <DropdownMenuRadioItem value="restaurants">
                    Restaurante
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="hotels">
                    Hotel
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="attractions">
                    Atrações
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Ranking</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    ranking >= star ? "text-yellow-400" : "text-gray-300"
                  )}
                  onClick={() => {
                    handleRatingSelect(star), setRanking(star);
                  }}
                >
                  <Star className="h-4 w-4 fill-current" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        className="w-full mb-2 flex justify-between"
        variant="outline"
        onClick={() => search()}
      >
        <span /> Pesquisar nessa área <Search />
      </Button>
      <div className="h-full">
        {loading ? (
          <div className="flex justify-center items-center h-[50%]">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <div className="space-y-4 overflow-auto">
            {places.length === 0 && (
              <div className="text-center text-muted-foreground">
                No places found
              </div>
            )}
            {places.length > 0 &&
              places.map((place: any, i: number) => (
                <PlaceCard place={place} key={i} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
