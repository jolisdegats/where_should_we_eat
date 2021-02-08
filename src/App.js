import Sidebar from "./components/Sidebar";
import SpinWheel from "./components/SpinWheel";
import styles from "./App.module.scss";
import { useState } from "react";

const App = () => {
  const [places, setPlaces] = useState([
    {
      isSelected: true,
      id: 1,
      name: "Raphael",
      link: "",
      icon: "",
      color: "#7400B8",
    },
    {
      isSelected: true,
      id: 2,
      name: "Italien",
      link: "",
      icon: "",
      color: "#6930C3",
    },
    {
      isSelected: true,
      id: 3,
      name: "Sushi",
      link: "",
      icon: "",
      color: "#5E60CE",
    },
    {
      isSelected: true,
      id: 4,
      name: "Coréen",
      link: "",
      icon: "",
      color: "#5390D9",
    },
    {
      isSelected: true,
      id: 5,
      name: "Soupe",
      link: "",
      icon: "",
      color: "#4EA8DE",
    },
    {
      isSelected: true,
      id: 6,
      name: "Burger",
      link: "",
      icon: "",
      color: "#48BFE3",
    },
    {
      isSelected: true,
      id: 7,
      name: "Bagel",
      link: "",
      icon: "",
      color: "#56CFE1",
    },
    {
      isSelected: true,
      id: 8,
      name: "Pegast",
      link: "",
      icon: "",
      color: "#64DFDF",
    },
    {
      isSelected: true,
      id: 9,
      name: "Jour",
      link: "",
      icon: "",
      color: "#72EFDD",
    },
  ]);

  const items = places.filter((item) => item.isSelected === true);

  return (
    <div className={styles.container}>
      <div className={styles.transparentContainer}>
        <Sidebar setPlaces={setPlaces} places={places}></Sidebar>
        <div className={styles.content}>
          <SpinWheel items={items}></SpinWheel>
        </div>
      </div>
    </div>
  );
};

export default App;
