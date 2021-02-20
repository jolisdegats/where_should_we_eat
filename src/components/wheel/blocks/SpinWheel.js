import { useEffect, useState } from "react";
// import LaunchButton from "./LaunchButton";
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
      // if only one item, return this item
      if (items.length < 3) {
        return item.id;
      }
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

  const stylingItems =
    items.length === 1
      ? {
          wheelItem: {
            height: "100%",
            left: "0%",
            width: "100%",
          },
          itemBackground: { "clip-path": "unset" },
        }
      : items.length < 3
      ? {
          wheelItem: {
            height: "unset",
            left: "50%",
            width: "50%",
          },
          itemBackground: { "clip-path": "unset" },
        }
      : {};

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
              key={item.id}
              style={{ "--item-nb": index, ...stylingItems.wheelItem }}
            >
              <div
                className="itemBackground"
                style={{
                  backgroundColor: item.color,
                  ...stylingItems.itemBackground,
                }}
              >
                <p>{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <LaunchButton selectItem={selectItem}></LaunchButton> */}
    </>
  );
};

export default SpinWheel;
