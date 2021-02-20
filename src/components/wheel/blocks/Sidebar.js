import { useContext } from "react";
import { firebaseAuth } from "../../../utils/context/AuthProvider";
import PlaceCard from "./PlaceCard";
import styles from "./Sidebar.module.scss";

const Sidebar = (props) => {
  const { user } = useContext(firebaseAuth);
  const { places, setPlaces } = props;

  return (
    <aside className={styles.sidebar}>
      <h2>Hi {user}!</h2>
      <h3>You favorite places</h3>
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
        <button>Add a new place</button>
      </div>
    </aside>
  );
};

export default Sidebar;
