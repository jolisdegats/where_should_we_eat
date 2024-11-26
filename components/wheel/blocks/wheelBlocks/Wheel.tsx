import { WHEEL_CONFIG, generateColor } from "./wheelUtils";
import { Place } from "@/interfaces/place";
import { WheelSegment } from "./WheelSegment";
import classNames from "classnames";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import { ResultAnnouncement } from "../ResultAnnouncement";

const Wheel = ({ items }: { items: Place[] }) => {
  const [selectedItem, setSelectedItem] = useState(items[0]?.id);
  const [spinning, setSpinning] = useState(false);
  const [totalRotation, setTotalRotation] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setSelectedItem(items[0]?.id);
    setSpinning(false);
    setTotalRotation(0);
  }, [items]);

  const polygonSide =
    WHEEL_CONFIG.size * Math.tan(((360 / items.length / 2) * Math.PI) / 180);

  const handleSpinEnd = () => {
    setSpinning(false);
    setShowResult(true);
  };

  const handleSpin = () => {
    if (spinning) return;

    const availableItems =
      items.length < 3
        ? items
        : items.filter((item) => item.id !== selectedItem);

    const randomItem =
      availableItems[Math.floor(Math.random() * availableItems.length)]?.id;

    const selectedSegment = items.findIndex((item) => item.id === randomItem);
    const degreesToSegment = -(selectedSegment * (360 / items.length));
    const currentFullRotations = Math.floor(Math.abs(totalRotation) / 360);
    const newFullRotations = currentFullRotations + WHEEL_CONFIG.turns;
    const newRotation = degreesToSegment - newFullRotations * 360;

    setSpinning(true);
    setSelectedItem(randomItem);
    setTotalRotation(newRotation);
  };

  return (
    <>
      {showResult && selectedItem && (
        <ResultAnnouncement
          result={items.find((item) => item.id === selectedItem)?.name}
          onAnimationEnd={() => setShowResult(false)}
        />
      )}

      <div
        className={classNames(
          styles["wheel-container"],
          "block relative box-content mx-auto rounded-full select-none border-solid"
        )}
        style={{
          borderWidth: `${WHEEL_CONFIG.borderSize}em`,
          width: `calc(${WHEEL_CONFIG.size}em + 2 * ${WHEEL_CONFIG.borderSize}em)`,
          height: `calc(${WHEEL_CONFIG.size}em + 2 * ${WHEEL_CONFIG.borderSize}em)`,
        }}
      >
        <div
          className={classNames(
            "block relative box-content mx-auto overflow-hidden rounded-full transition-transform border border-white",
            spinning ? "pointer-events-none" : "cursor-pointer"
          )}
          style={{
            borderWidth: `5px`,
            width: `${WHEEL_CONFIG.size}em`,
            height: `${WHEEL_CONFIG.size}em`,
            transform: `rotate(${totalRotation}deg)`,
            transitionDuration: `${spinning ? WHEEL_CONFIG.spinDuration : 0}ms`,
            transitionTimingFunction: "cubic-bezier(0.2, 0.6, 0.3, 1)",
          }}
          onClick={handleSpin}
          onTransitionEnd={handleSpinEnd}
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
    </>
  );
};

export default Wheel;
