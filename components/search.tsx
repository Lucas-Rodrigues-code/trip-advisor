import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState, useCallback, FormEvent } from "react";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export default function Search({ onPlaceSelect }: Props) {
  const map = useMap();
  const places = useMapsLibrary("places");

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      console.log(placeId, "placeId");
      alert("hi");
      if (!places) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, places, placesService, sessionToken]
  );

  return (
    <section className="bg-primary pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
            Encontre sua próxima aventura
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Pesquise hotéis, restaurantes e coisas para fazer.
          </p>
          <form className="relative flex items-center gap-2 bg-primary-foreground rounded-md p-2 h-14">
            <Command>
              <CommandInput
                placeholder="Onde você está indo?"
                value={inputValue}
                onInput={(event: FormEvent<HTMLInputElement>) =>
                  onInputChange(event)
                }
                className="flex-1 bg-transparent border-none focus:ring-0"
              />
              <CommandList className="absolute z-10 bg-white top-12 left-0 right-0">
                {predictionResults.length > 0 &&
                  predictionResults.map(({ place_id, description }) => {
                    return (
                      <div
                        key={place_id}
                        className="custom-list-item px-2 flex justify-start cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSuggestionClick(place_id)}
                      >
                        {description}
                      </div>
                    );
                  })}
              </CommandList>
            </Command>
            <Button className="px-4 py-2 text-sm">Pesquisar</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
