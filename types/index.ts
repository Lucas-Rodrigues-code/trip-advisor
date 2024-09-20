export type Coordinates = {
  lat: number;
  lng: number;
};

export type Bounds = {
  sw: Coordinates;
  ne: Coordinates;
};

export interface Place {
  name: string;
  rating: number;
  photo: string;
  description: string;
  address: string;
  phone: string;
  price: string;
  cuisine: string[];
  website: string;
  web_url: string;
  latitude: string;
  longitude: string;
}
