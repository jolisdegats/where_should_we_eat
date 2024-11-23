"use client";
import { useState } from "react";
import Modal from "@/components/common/Modal";
import PlaceCard from "./PlaceCard";
import { Place } from "@/interfaces/place";

interface NewPlace {
  name: string;
  link: string;
}

interface SidebarProps {
  places: Place[];
  setPlaces: (places: Place[]) => void;
}

const Sidebar = ({ places, setPlaces }: SidebarProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newPlace, setNewPlace] = useState<NewPlace>({ name: "", link: "" });

  const handleAddPlace = (): void => {
    if (!newPlace.name.trim()) return;

    setPlaces([
      ...places,
      {
        id: places.length + 1,
        name: newPlace.name,
        link: newPlace.link,
        isSelected: true,
      },
    ]);

    setNewPlace({ name: "", link: "" });
    setIsModalOpen(false);
  };

  return (
    <>
      <aside className="w-96 bg-white rounded-l-2xl p-8 flex flex-col">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Your favorite places
        </h2>

        <div className="flex-1 overflow-auto">
          {places.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              places={places}
              setPlaces={setPlaces}
            />
          ))}
        </div>

        <div className="h-20 flex items-center justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Add a new place
          </button>
        </div>
      </aside>

      <Modal
        isModalOpen={isModalOpen}
        hide={() => setIsModalOpen(false)}
        title="Add a new place"
      >
        <form onSubmit={handleAddPlace}>
          <input
            type="text"
            placeholder="Name"
            value={newPlace.name}
            onChange={(e) => setNewPlace({ ...newPlace, name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <input
            type="text"
            placeholder="Link"
            value={newPlace.link}
            onChange={(e) => setNewPlace({ ...newPlace, link: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md mb-2"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          >
            Add place
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Sidebar;
