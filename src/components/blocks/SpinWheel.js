import { useEffect, useState } from "react";
import LaunchButton from "./LaunchButton";
import "./SpinWheel.scss";

const SpinWheel = (props) => {
  const { items } = props;

  const wheelSize = 25;
  const turns = 4;
  const spinDuration = 3000;
  const polygonSide =
    wheelSize * Math.tan(((360 / items.length / 2) * Math.PI) / 180);

  const [selectedItem, setSelectedItem] = useState(1);
  const [wheelVars, setWheelVars] = useState({});
  const [spinning, setSpinning] = useState("");

  const selectItem = () => {
    // SelectedItem must be different from previous one
    const itemsWithoutSelected = items.filter((item) => {
      return item.id !== selectedItem;
    });
    const randomItem =
      itemsWithoutSelected[
        Math.floor(Math.random() * itemsWithoutSelected.length)
      ].id;
    setSpinning("spinning");
    setSelectedItem(randomItem);
    setTimeout(() => setSpinning(""), spinDuration);
  };

  useEffect(
    () =>
      setWheelVars({
        "--wheel-size": `${wheelSize}em`,
        "--PI": Math.PI,
        "--nb-turn": turns,
        "--spinning-duration": `${spinDuration}ms`,
        "--nb-item": items.length,
        "--selected-item": selectedItem - 1,
        "--item-bg-size": polygonSide + "em",
      }),
    [wheelSize, turns, spinDuration, items, selectedItem, polygonSide]
  );

  return (
    <>
      <div className="wheel-container">
        <div
          className={`wheel ${spinning}`}
          style={wheelVars}
          onClick={selectItem}
        >
          {items.map((item, index) => (
            <div
              className="wheel-item"
              key={index}
              style={{ "--item-nb": index }}
            >
              <div
                className="itemBackground"
                style={{ backgroundColor: item.color }}
              >
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <LaunchButton selectItem={selectItem}></LaunchButton>
    </>
  );
};

export default SpinWheel;
