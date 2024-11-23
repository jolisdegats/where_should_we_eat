import { useState } from "react";
import styles from "./SpinWheel.module.scss";
import { Place } from "@/interfaces/place";
import classNames from "classnames";
import { WheelSegment } from "./WheelSegment";
import { WHEEL_CONFIG, generateColor } from "./wheelUtils";

interface SpinWheelProps {
  items: Place[];
}

const SpinWheel = ({ items }: SpinWheelProps) => {
  const [selectedItem, setSelectedItem] = useState(1);
  const [spinning, setSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);

  const polygonSide =
    WHEEL_CONFIG.size * Math.tan(((360 / items.length / 2) * Math.PI) / 180);

  const handleSpin = () => {
    if (spinning) return;

    const availableItems = items.filter((item) => item.id !== selectedItem);

    if (availableItems.length === 0) {
      availableItems.push(...items.filter((item) => item.id !== selectedItem));
    }

    const randomItem =
      availableItems[Math.floor(Math.random() * availableItems.length)].id;

    const selectedSegment = items.findIndex((item) => item.id === randomItem);
    const degreesToSegment = -(selectedSegment * (360 / items.length));
    const currentFullRotations = Math.floor(Math.abs(totalRotation) / 360);
    const newFullRotations = currentFullRotations + WHEEL_CONFIG.turns;
    const newRotation = degreesToSegment - newFullRotations * 360;

    setSpinning(true);
    setSelectedItem(randomItem);
    setTotalRotation(newRotation);

    setTimeout(() => setSpinning(false), WHEEL_CONFIG.spinDuration);
  };

  return (
    <div
      className={classNames(
        styles["wheel-container"],
        "block relative box-content mx-auto rounded-full select-none border-[3px] border-solid",
        `w-[calc(${WHEEL_CONFIG.size}em+2*${WHEEL_CONFIG.borderSize}em)]`,
        `h-[calc(${WHEEL_CONFIG.size}em+2*${WHEEL_CONFIG.borderSize}em)]`
      )}
    >
      <div
        className={classNames(
          "block relative box-content mx-auto overflow-hidden rounded-full transition-transform border border-white border-[0.3em]",
          `w-[${WHEEL_CONFIG.size}em]`,
          `h-[${WHEEL_CONFIG.size}em]`,
          spinning ? "pointer-events-none" : "cursor-pointer"
        )}
        style={{
          transform: `rotate(${totalRotation}deg)`,
          transitionDuration: `${spinning ? WHEEL_CONFIG.spinDuration : 0}ms`,
          transitionTimingFunction: "cubic-bezier(0.2, 0.6, 0.3, 1)",
        }}
        onClick={handleSpin}
      >
        {items.map((item, index) => (
          <WheelSegment
            key={item.id}
            item={item}
            index={index}
            totalItems={items.length}
            polygonSide={polygonSide}
            color={generateColor(index, items.length)}
          />
        ))}
      </div>
    </div>
  );
};

export default SpinWheel;
