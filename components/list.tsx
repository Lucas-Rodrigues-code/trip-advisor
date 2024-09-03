"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    name: "Restaurantes",
    items: [
      {
        name: "The Gourmet Kitchen",
        description: "Fine dining experience",
        rating: 4,
        image: "/york.jpg",
      },
      {
        name: "Burger Bliss",
        description: "Best burgers in town",
        rating: 3,
        image: "/york.jpg",
      },
      {
        name: "Sushi Sensation",
        description: "Fresh and authentic sushi",
        rating: 5,
        image: "/york.jpg",
      },
      {
        name: "Pizza Paradise",
        description: "Authentic Italian pizzas",
        rating: 4,
        image: "/york.jpg",
      },
      {
        name: "Taco Town",
        description: "Delicious Mexican street food",
        rating: 2,
        image: "/york.jpg",
      },
    ],
  },
  {
    name: "Hotels",
    items: [
      {
        name: "Luxury Towers",
        description: "5-star accommodations",
        rating: 5,
        image: "/york.jpg",
      },
      {
        name: "Cozy Inn",
        description: "Charming bed and breakfast",
        rating: 3,
        image: "/york.jpg",
      },
      {
        name: "Beachside Resort",
        description: "Oceanfront paradise",
        rating: 4,
        image: "/york.jpg",
      },
      {
        name: "City Center Hotel",
        description: "Perfect for business travelers",
        rating: 3,
        image: "/york.jpg",
      },
      {
        name: "Mountain Lodge",
        description: "Scenic views and outdoor activities",
        rating: 4,
        image: "/york.jpg",
      },
    ],
  },
  {
    name: "Atrações",
    items: [
      {
        name: "Adventure Park",
        description: "Thrilling rides and games",
        rating: 4,
        image: "/york.jpg",
      },
      {
        name: "Art Museum",
        description: "World-class exhibitions",
        rating: 5,
        image: "/york.jpg",
      },
      {
        name: "Botanical Gardens",
        description: "Serene natural beauty",
        rating: 3,
        image: "/york.jpg",
      },
      {
        name: "Zoo",
        description: "Home to exotic animals",
        rating: 4,
        image: "/york.jpg",
      },
      {
        name: "Historical Castle",
        description: "Step back in time",
        rating: 2,
        image: "/york.jpg",
      },
    ],
  },
];

function StarRating({
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

export default function List() {
  const [selectedRatings, setSelectedRatings] = useState<
    Record<string, number>
  >({});

  const handleRatingSelect = (category: string, rating: number) => {
    setSelectedRatings((prev) => ({ ...prev, [category]: rating }));
  };

  return (
    <Tabs
      defaultValue="Restaurantes"
      className="w-full h-[100vh] max-w-2xl mx-auto p-3 mb-11"
    >
      <TabsList className="grid w-full grid-cols-3">
        {categories.map((category) => (
          <TabsTrigger key={category.name} value={category.name}>
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((category) => (
        <TabsContent key={category.name} value={category.name}>
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Filtrar por avaliação:</h2>
            <StarRating
              rating={selectedRatings[category.name] || 0}
              onSelect={(rating) => handleRatingSelect(category.name, rating)}
              selectedRating={selectedRatings[category.name] || 0}
            />
          </div>
          <div className="space-y-4 h-[90vh] overflow-auto">
            {category.items
              .filter(
                (item) =>
                  !selectedRatings[category.name] ||
                  item.rating >= selectedRatings[category.name]
              )
              .map((item) => (
                <Card key={item.name}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Rating:</div>
                      <StarRating
                        rating={item.rating}
                        onSelect={() => {}}
                        selectedRating={item.rating}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
