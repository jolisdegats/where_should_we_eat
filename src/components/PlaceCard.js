import styles from "./PlaceCard.module.scss";

const PlaceCard = (props) => {
  const { places, setPlaces, place } = props;

  const handleItemClick = () => {
    const modifiedItem = places.find((item) => item.id === place.id);

    return setPlaces(
      [...places],
      (modifiedItem.isSelected = !modifiedItem.isSelected)
    );
  };

  return (
    <div className={styles.placeCard}>
      <input
        type="checkbox"
        checked={place.isSelected}
        onChange={handleItemClick}
      ></input>
      <p>{place.name}</p>
      {place.link && <p>{place.link}</p>}
    </div>
  );
};

export default PlaceCard;
