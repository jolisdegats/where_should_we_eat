import { useEffect, useState } from "react";
// import LaunchButton from "./LaunchButton";
import styles from "./SpinWheel.module.scss";
import { Place } from "@/interfaces/place";
import classNames from "classnames";
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
  const wheelBorderSize = 3;
  const wheelFont = "Lato, Quicksand, sans-serif";
  const resetDuration = 0;
  const wheelSize = 25;
  const turns = 4;
  const spinDuration = 3000;
  const polygonSide =
    wheelSize * Math.tan(((360 / items.length / 2) * Math.PI) / 180);

  const [selectedItem, setSelectedItem] = useState(1);
  const [spinning, setSpinning] = useState(false);

  const selectItem = () => {
    const itemsWithoutSelected = items.filter((item) => {
      if (items.length < 3) {
        return item.id;
      }
      return item.id !== selectedItem;
    });

    const randomItem =
      itemsWithoutSelected[
        Math.floor(Math.random() * itemsWithoutSelected.length)
      ].id;
    setSpinning(true);
    setSelectedItem(randomItem);
    setTimeout(() => setSpinning(false), spinDuration);
  };
  const rotation = -360 * (selectedItem - 1 / (items.length ?? 1));

  return (
    <>
      <div
        className={classNames(
          `block relative box-content w-[calc(${wheelSize}em+2*${wheelBorderSize}em)] h-[calc(${wheelSize}em+2*${wheelBorderSize}em)] mx-auto border-[3px] border-solid rounded-full select-none`,
          styles["wheel-container"]
        )}
      >
        <div
          className={classNames(
            `block relative box-content mx-auto w-[${wheelSize}em] h-[${wheelSize}em] overflow-hidden rounded-full border border-white border-[0.3em] bg-white cursor-pointer] transition-transform`,
            { "pointer-events-none": spinning }
          )}
          style={{
            //TODO: fix the rotation
            transform: `rotate(${(spinning ? turns : 1) * rotation}deg)`,
            transitionDuration: spinning
              ? `${spinDuration}ms`
              : `${resetDuration}ms`,
          }}
          onClick={selectItem}
        >
          {items.map((item, index) => (
            <div
              className={`flex absolute box-border top-1/2 left-1/2 w-1/2 text-right text-white font-[${wheelFont}] 
              ${styles["animate"]} 
              ${styles["rotate"]} 
              `}
              key={item.id}
              style={{
                height: items.length <= 2 ? "100%" : `${polygonSide}rem`,
                width: items.length > 1 ? "50%" : "100%",
                left: items.length > 1 ? "50%" : "0%",
                transformOrigin: "center left",
                transform: `translateY(-50%)
                        rotate(calc(${index}*(360deg/${items.length})))`,
              }}
            >
              <div
                className={classNames(
                  `w-full relative right-0 top-0 flex justify-end items-center`
                )}
                style={{
                  WebkitClipPath:
                    items.length >= 3
                      ? "polygon(0 50%, 100% 0, 110% 33%, 110% 66%, 100% 100%)"
                      : "unset",
                  backgroundColor: generateColor(index, items.length),
                }}
              >
                <p className="relative z-2 right-6 text-white">{item.name}</p>
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
