import { useState } from "react";
import { Input } from "@/components/common/Input";
import styles from "./styles.module.scss";
import Cookies from "js-cookie";
const COOKIE_NAME = "wswe_places";

const AddPlacesForm = () => {
  const [places, setPlaces] = useState<string[]>([]);
  const [currentPlace, setCurrentPlace] = useState("");

  const handleAddPlace = (place: string) => {
    if (place.trim()) {
      const newPlaces = [place.trim(), ...places];
      setPlaces(newPlaces);
      setCurrentPlace("");
      Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
    }
  };

  const handleRemovePlace = (indexToRemove: number) => {
    const newPlaces = places.filter((_, index) => index !== indexToRemove);
    setPlaces(newPlaces);
    Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
  };

  return (
    <>
      <Input
        className={styles.inputContainer}
        name="place"
        placeholder="Enter your favorite place"
        value={currentPlace}
        onChange={(e) => setCurrentPlace(e.target.value)}
        iconType="add"
        showIcon={!!currentPlace}
        onIconClick={() => handleAddPlace(currentPlace)}
      />

      <ul className={styles.placesList}>
        {places.map((place, index) => (
          <li key={index} className={styles.placeItem}>
            <span>{place}</span>
            <button
              type="button"
              onClick={() => handleRemovePlace(index)}
              className={styles.removeButton}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddPlacesForm;
