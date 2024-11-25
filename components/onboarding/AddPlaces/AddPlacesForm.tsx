import { useState, useRef, useEffect } from "react";
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
  const [editValue, setEditValue] = useState("");
  const editContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editingIndex !== null &&
        editContainerRef.current &&
        !editContainerRef.current.contains(event.target as Node)
      ) {
        cancelEdit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [editingIndex]);

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
    setEditValue(places[index].name);
  };

  const handleSaveEdit = (index: number) => {
    if (editValue.trim() && editValue !== places[index].name) {
      const newPlaces = [...places];
      newPlaces[index] = { ...newPlaces[index], name: editValue.trim() };
      setPlaces(newPlaces);
      handlePlacesChange?.(newPlaces);
      Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
    }
    setEditingIndex(null);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditValue("");
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
                [styles.editing]: editingIndex === index,
              })}
            >
              {editingIndex === index ? (
                <div ref={editContainerRef} className={styles.editContainer}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={styles.editInput}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEdit(index);
                      } else if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                  />
                  <div className={styles.actions}>
                    <Button
                      variant="text"
                      color={color}
                      onClick={() => handleSaveEdit(index)}
                      className={styles.actionButton}
                      title="Save changes"
                    >
                      <Icon type="checkmark" color={color} />
                    </Button>
                    <Button
                      variant="text"
                      color={color}
                      onClick={cancelEdit}
                      className={styles.actionButton}
                      title="Cancel editing"
                    >
                      <Icon type="undo" color={color} />
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{place.name}</span>
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
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddPlacesForm;
