import Image from "next/image";
import { DollarSign, MapPin, Phone, ExternalLink } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import { StarRating } from "./list";

export default function PlaceCard({ place }: { place: any }) {
  return (
    <Card key={place?.name}>
      <div className="relative h-48 w-full">
        <Image
          src={place.photo?.images?.large?.url || "/york.jpg"}
          alt={place?.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle>{place?.name}</CardTitle>
        <CardDescription>{place?.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-2">
          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
          <p className="text-sm">{place?.address}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm">{place?.phone}</p>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm">{place?.price}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {place?.cuisine?.map((cuisine: any, index: number) => (
            <Badge key={index} variant="secondary">
              {cuisine?.name}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm font-medium">Avaliação</div>
          <StarRating
            rating={place.rating}
            onSelect={() => {}}
            selectedRating={Math.floor(Number(place.rating))}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full m-1" variant="outline" asChild>
          <a href={place?.website} target="_blank" rel="noopener noreferrer">
            Site
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
        <Button className="w-full m-1" variant="outline" asChild>
          <a href={place?.web_url} target="_blank" rel="noopener noreferrer">
            Trip Advisor
            <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
