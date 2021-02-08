import PlaceCard from "./PlaceCard";
import styles from "./Sidebar.module.scss";

const Sidebar = (props) => {
  const { places, setPlaces } = props;

  return (
    <aside className={styles.sidebar}>
      <h1>where do we eat today?</h1>
      <h2>You favorite places</h2>
      <div className={styles.placesList}>
        {places.map((place) => {
          return (
            <PlaceCard
              key={place.id}
              setPlaces={setPlaces}
              places={places}
              place={place}
            ></PlaceCard>
          );
        })}
      </div>
      <div className={styles.cta}>
        <button>Button</button>
      </div>
    </aside>
  );
};

export default Sidebar;
