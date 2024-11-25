"use client";
import { Place } from "@/interfaces/place";
import AddPlacesForm from "../onboarding/AddPlaces/AddPlacesForm";

interface SidebarProps {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  username: string;
}

const Sidebar = ({
  places,
  setPlaces,
  username,
}: SidebarProps): JSX.Element => {
  return (
    <aside className="w-96 bg-white rounded-l-2xl p-8 flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Hey {username},<br /> what should we eat today?
      </h2>
      <AddPlacesForm
        initialPlaces={places}
        handlePlacesChange={setPlaces}
        color="dark"
        canRemove
        canEdit
      />
    </aside>
  );
};

export default Sidebar;
