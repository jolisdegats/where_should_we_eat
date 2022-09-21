import {  useContext, useEffect } from "react";
import { firebaseAuth } from "../../../utils/context/AuthProvider";
import useModal from "../../../utils/hooks/useModal";
import usePlaces from "../../../utils/hooks/usePlaces";
import LoadingSpinner from "../../common/LoadingSpinner";
import Sidebar from "../blocks/Sidebar";
import SpinWheel from "../blocks/SpinWheel";
import styles from "./Main.module.scss";

const Main = () => {
  const { handleSignOut, user, getUserName } = useContext(firebaseAuth);

  const {places, setPlaces} = usePlaces()
  const { modalOpen} = useModal()

  // const [places, setPlaces] = useState([
  //   {
  //     isSelected: true,
  //     id: 1,
  //     name: "Raphael",
  //     link: "",
  //     icon: "",
  //     color: "#7400B8",
  //   },
  //   {
  //     isSelected: true,
  //     id: 2,
  //     name: "Italien",
  //     link: "",
  //     icon: "",
  //     color: "#6930C3",
  //   },
  //   {
  //     isSelected: true,
  //     id: 3,
  //     name: "Sushi",
  //     link: "",
  //     icon: "",
  //     color: "#5E60CE",
  //   },
  //   {
  //     isSelected: true,
  //     id: 4,
  //     name: "Coréen",
  //     link: "",
  //     icon: "",
  //     color: "#5390D9",
  //   },
  //   {
  //     isSelected: true,
  //     id: 5,
  //     name: "Soupe",
  //     link: "",
  //     icon: "",
  //     color: "#4EA8DE",
  //   },
  //   {
  //     isSelected: true,
  //     id: 6,
  //     name: "Burger",
  //     link: "",
  //     icon: "",
  //     color: "#48BFE3",
  //   },
  //   {
  //     isSelected: true,
  //     id: 7,
  //     name: "Bagel",
  //     link: "",
  //     icon: "",
  //     color: "#56CFE1",
  //   },
  //   {
  //     isSelected: true,
  //     id: 8,
  //     name: "Pegast",
  //     link: "",
  //     icon: "",
  //     color: "#64DFDF",
  //   },
  //   {
  //     isSelected: true,
  //     id: 9,
  //     name: "Jour",
  //     link: "",
  //     icon: "",
  //     color: "#72EFDD",
  //   },
  //   {
  //     isSelected: true,
  //     id: 10,
  //     name: "Napoli Gang",
  //     link: "",
  //     icon: "",
  //     color: "#72EF0D",
  //   },
  //   {
  //     isSelected: true,
  //     id: 11,
  //     name: "Big Fernand",
  //     link: "",
  //     icon: "",
  //     color: "#02EF0D",
  //   },
  // ]);

  const items = places.filter((item) => item.isSelected === true);

  useEffect(() => {
    getUserName();
  }, [getUserName]);

console.log(modalOpen)

  return !user ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <>
        {modalOpen && <div>COUCOU</div>}
      <nav>
        <button onClick={() => handleSignOut()}>
          <img
            alt="menu icon"
            src={`${process.env.PUBLIC_URL}/images/icons/menu.svg`}
          ></img>
        </button>
      </nav>
      <div className={styles.transparentContainer}>
        <Sidebar setPlaces={setPlaces} places={places}></Sidebar>
        <div className={styles.content}>
          <SpinWheel items={items}></SpinWheel>
        </div>
      </div>
    </>
  );
};

export default Main;
