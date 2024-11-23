import { useState } from "react";
import { Input } from "@/components/common/Input";
import styles from "./styles.module.scss";
import Cookies from "js-cookie";
import classNames from "classnames";
import { Place } from "@/interfaces/place";
import { Button } from "@/components/common/Button";
import { Icon } from "@/components/common/Icon";
const COOKIE_NAME = "wswe_places";

const AddPlacesForm = ({
  color = "light",
  className,
  initialPlaces = [],
  handlePlacesChange,
  hoverForButtons = true,
  canEdit = false,
  canRemove = false,
}: {
  color?: "light" | "dark";
  className?: string;
  initialPlaces?: Place[];
  handlePlacesChange?: (places: Place[]) => void;
  hoverForButtons?: boolean;
  canEdit?: boolean;
  canRemove?: boolean;
}) => {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [currentPlace, setCurrentPlace] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedPlace, setEditedPlace] = useState<string>("");

  const handleAddPlace = (place: string) => {
    if (place.trim()) {
      const newPlace = {
        name: place.trim(),
        id: places.length + 1,
        isSelected: true,
      };
      const newPlaces = [newPlace, ...places];
      setPlaces(newPlaces);
      handlePlacesChange?.(newPlaces);
      setCurrentPlace("");
      Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
    }
  };

  const handleRemovePlace = (indexToRemove: number) => {
    const newPlaces = places.filter((_, index) => index !== indexToRemove);
    setPlaces(newPlaces);
    handlePlacesChange?.(newPlaces);
    Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
  };

  const handleEditPlace = (index: number) => {
    setEditingIndex(index);
  };
  const handlePlaceEdited = (index: number, value: string) => {
    const newPlaces = places.map((place, i) =>
      i === index ? { ...place, name: value } : place
    );
    setPlaces(newPlaces);
    handlePlacesChange?.(newPlaces);
    setEditingIndex(null);
  };

  return (
    <div className={classNames("mt-5 flex flex-col gap-2", className)}>
      <Input
        color={color}
        className={styles.inputContainer}
        name="place"
        placeholder="Enter your favorite place"
        value={currentPlace}
        onChange={(e) => setCurrentPlace(e.target.value)}
        iconType="add"
        showIcon={!!currentPlace}
        onIconClick={() => handleAddPlace(currentPlace)}
      />

      {!!places.length && (
        <ul className={styles.placesList}>
          {places.map((place, index) => (
            <li
              key={index}
              className={classNames(styles.placeItem, {
                "bg-white/10": color === "dark",
                "text-black": color === "dark",
                "text-white": color === "light",
                [styles.showButtonsOnHover]: hoverForButtons,
              })}
            >
              <>
                <input
                  type="text"
                  value={place.name}
                  disabled={editingIndex !== index}
                />
                {(canEdit || canRemove) && (
                  <div className={styles.actions}>
                    {canEdit && (
                      <Button
                        variant="text"
                        color={color}
                        onClick={() => handleEditPlace(index)}
                        className={styles.actionButton}
                      >
                        <Icon type="edit" color={color} />
                      </Button>
                    )}
                    {canRemove && (
                      <Button
                        variant="text"
                        color={color}
                        onClick={() => handleRemovePlace(index)}
                        className={styles.actionButton}
                      >
                        <Icon type="close" color={color} />
                      </Button>
                    )}
                  </div>
                )}
              </>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddPlacesForm;
