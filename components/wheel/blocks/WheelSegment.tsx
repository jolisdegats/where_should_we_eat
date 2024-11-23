import { Place } from "@/interfaces/place";
import classNames from "classnames";
import styles from "./SpinWheel.module.scss";
import { WHEEL_CONFIG } from "./wheelUtils";

interface WheelSegmentProps {
  item: Place;
  index: number;
  totalItems: number;
  polygonSide: number;
  color: string;
}

export const WheelSegment = ({
  item,
  index,
  totalItems,
  polygonSide,
  color,
}: WheelSegmentProps) => {
  return (
    <div
      className={classNames(
        "flex absolute box-border top-1/2 text-right text-white",
        styles.animate,
        styles.rotate
      )}
      style={{
        height: totalItems <= 2 ? "100%" : `${polygonSide}rem`,
        width: totalItems > 1 ? "50%" : "100%",
        left: totalItems > 1 ? "50%" : "0%",
        transformOrigin: "center left",
        transform: `translateY(-50%) rotate(calc(${index}*(360deg/${totalItems})))`,
        fontFamily: WHEEL_CONFIG.font,
      }}
    >
      <div
        className="w-full relative right-0 top-0 flex justify-end items-center"
        style={{
          WebkitClipPath:
            totalItems >= 3
              ? "polygon(0 50%, 100% 0, 110% 33%, 110% 66%, 100% 100%)"
              : "unset",
          backgroundColor: color,
        }}
      >
        <p className="relative z-2 right-6 text-white">{item.name}</p>
      </div>
    </div>
  );
};
