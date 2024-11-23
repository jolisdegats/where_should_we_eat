import { useEffect, useState } from "react";
// import LaunchButton from "./LaunchButton";
import styles from "./SpinWheel.module.scss";
import { Place } from "@/interfaces/place";
const BASE_COLORS = [
  "#7400B8",
  "#6930C3",
  "#5E60CE",
  "#5390D9",
  "#4EA8DE",
  "#48BFE3",
];

const hexToRgb = (hex: string): number[] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return (
    "#" +
    [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, "0")).join("")
  );
};

const generateColor = (index: number, total: number): string => {
  // Calculate position in the gradient (0 to 1)
  const position = total > 1 ? index / (total - 1) : 0;

  // Calculate which segment of the base colors we're in
  const segment = position * (BASE_COLORS.length - 1);
  const segmentIndex = Math.floor(segment);
  const progress = segment - segmentIndex;

  // If we're exactly on a base color, return it
  if (progress === 0 && segmentIndex < BASE_COLORS.length) {
    return BASE_COLORS[segmentIndex];
  }

  // Interpolate between the two nearest base colors
  const color1 = hexToRgb(BASE_COLORS[segmentIndex]);
  const color2 = hexToRgb(BASE_COLORS[segmentIndex + 1]);

  const r = color1[0] + (color2[0] - color1[0]) * progress;
  const g = color1[1] + (color2[1] - color1[1]) * progress;
  const b = color1[2] + (color2[2] - color1[2]) * progress;

  return rgbToHex(r, g, b);
};

const SpinWheel = ({ items }: { items: Place[] }) => {
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
          itemBackground: { clipPath: "unset" },
        }
      : items.length < 3
      ? {
          wheelItem: {
            height: "unset",
            left: "50%",
            width: "50%",
          },
          itemBackground: { clipPath: "unset" },
        }
      : {};

  return (
    <>
      <div className={styles["wheel-container"]}>
        <div
          className={`${styles["wheel"]} ${styles[spinning]}`}
          style={wheelVars}
          onClick={selectItem}
        >
          {items.map((item, index) => (
            <div
              className={`${styles["wheel-item"]} ${styles["animate"]} ${styles["rotate"]}`}
              key={item.id}
              style={
                {
                  "--item-nb": index,
                  ...stylingItems.wheelItem,
                } as React.CSSProperties
              }
            >
              <div
                className={styles["itemBackground"]}
                style={{
                  backgroundColor: generateColor(index, items.length),
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
