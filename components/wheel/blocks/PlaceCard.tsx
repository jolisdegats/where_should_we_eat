"use client";
import { Place } from "@/interfaces/place";
interface PlaceCardProps {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  place: Place;
}

const PlaceCard = ({
  places,
  setPlaces,
  place,
}: PlaceCardProps): JSX.Element => {
  const handleItemClick = (): void => {
    const updatedPlaces = places.map((item) =>
      item.id === place.id ? { ...item, isSelected: !item.isSelected } : item
    );
    setPlaces(updatedPlaces);
  };

  return (
    <div
      className="flex items-center my-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
      onClick={handleItemClick}
    >
      <div
        className={`w-5 h-5 border-2 rounded mr-2 flex items-center justify-center
          ${
            place.isSelected ? "border-blue-500 bg-blue-500" : "border-blue-500"
          }`}
      >
        {place.isSelected && (
          <svg
            className="w-3 h-3 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
          </svg>
        )}
      </div>
      <p className="text-gray-700">{place.name}</p>
      {place.link && <p className="ml-2 text-blue-500">{place.link}</p>}
    </div>
  );
};

export default PlaceCard;
