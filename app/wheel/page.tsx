import { cookies } from "next/headers";
import ClientPage from "./client.page";
import { Place } from "@/interfaces/place";

export const metadata = {
  title: "Where Should We Eat?",
  description: "A fun way to decide where to eat",
};

const mapPlacesFromCookie = (
  place: any,
  places: any[],
  index: number
): Place => {
  return {
    id: index + 1,
    name: place,
    isSelected: true,
  };
};

export default async function Page() {
  const cookieStore = await cookies();
  const placesData = cookieStore.get("wswe_places");

  const initialPlaces: Place[] = placesData
    ? JSON.parse(placesData.value).map((place: string, index: number) =>
        mapPlacesFromCookie(place, JSON.parse(placesData.value), index)
      )
    : [];

  return <ClientPage initialPlaces={initialPlaces} />;
}
