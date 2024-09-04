import axios from "axios";

import { Coordinates } from "@/types";

export async function getPlacesData(
  sw: Coordinates,
  ne: Coordinates,
  category: string
) {
  const URL = `https://travel-advisor.p.rapidapi.com/${category}/list-in-boundary`;
  try {
    const {
      data: { data },
    } = await axios.get(URL, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        "x-rapidapi-key": "655b75675bmsh4a0aeb211fb8693p138a13jsndaaa68cb90c4",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}
