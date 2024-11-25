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
  const [places, setPlaces] = useState<Place[]>(
    initialPlaces.map((place) =>
      typeof place === "string"
        ? { id: crypto.randomUUID(), name: place, isSelected: true }
        : place
    )
  );
  const [currentPlace, setCurrentPlace] = useState("");
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
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

  const handleAddPlace = () => {
    if (currentPlace.trim()) {
      const newPlace: Place = {
        id: crypto.randomUUID(),
        name: currentPlace.trim(),
        isSelected: true,
      };
      const newPlaces = [...places, newPlace];
      setPlaces(newPlaces);
      handlePlacesChange?.(newPlaces);
      setCurrentPlace("");
      Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
    }
  };

  const handleRemovePlace = (id: string) => {
    const newPlaces = places.filter((place) => place.id !== id);
    setPlaces(newPlaces);
    handlePlacesChange?.(newPlaces);
    Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
  };

  const handleEditPlace = (id: string) => {
    setEditingIndex(id);
    setEditValue(places.find((place) => place.id === id)?.name || "");
  };

  const handleSaveEdit = (id: string) => {
    if (editValue.trim()) {
      const newPlaces = places.map((place) =>
        place.id === id ? { ...place, name: editValue.trim() } : place
      );
      setPlaces(newPlaces);
      handlePlacesChange?.(newPlaces);
      setEditingIndex(null);
      Cookies.set(COOKIE_NAME, JSON.stringify(newPlaces));
    }
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
        onIconClick={() => handleAddPlace()}
      />

      {!!places.length && (
        <ul className={styles.placesList}>
          {places.map((place) => (
            <li
              key={place.id}
              className={classNames(styles.placeItem, {
                "bg-white/10": color === "dark",
                "text-black": color === "dark",
                "text-white": color === "light",
                [styles.showButtonsOnHover]: hoverForButtons,
                [styles.editing]: editingIndex === place.id,
              })}
            >
              {editingIndex === place.id ? (
                <div ref={editContainerRef} className={styles.editContainer}>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className={styles.editInput}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveEdit(place.id);
                      } else if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                  />
                  <div className={styles.actions}>
                    <Button
                      variant="text"
                      color={color}
                      onClick={() => handleSaveEdit(place.id)}
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
                          onClick={() => handleEditPlace(place.id)}
                          className={styles.actionButton}
                        >
                          <Icon type="edit" color={color} />
                        </Button>
                      )}
                      {canRemove && (
                        <Button
                          variant="text"
                          color={color}
                          onClick={() => handleRemovePlace(place.id)}
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
