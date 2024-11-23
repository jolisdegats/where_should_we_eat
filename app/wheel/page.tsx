import { cookies } from "next/headers";
import ClientPage from "./client.page";
import { Place } from "@/interfaces/place";

export const metadata = {
  title: "Where Should We Eat?",
  description: "A fun way to decide where to eat",
};

export default async function Page() {
  const cookieStore = await cookies();
  const placesData = cookieStore.get("wswe_places");
  const username = cookieStore.get("wswe_username");

  const initialPlaces: Place[] = placesData ? JSON.parse(placesData.value) : [];
  return (
    <ClientPage
      initialPlaces={initialPlaces}
      initialUsername={username?.value}
    />
  );
}
