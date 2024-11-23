import { Place } from "@/interfaces/place";
import Wheel from "./blocks/wheelBlocks/Wheel";

const SpinWheel = ({ places }: { places: Place[] }) => {
  return (
    <div className="flex-1 bg-white/10 backdrop-blur rounded-r-2xl p-8 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
        {places.length === 0 ? (
          <p className="text-white text-center">No places selected yet.</p>
        ) : (
          <Wheel items={places.filter((item) => item.isSelected === true)} />
        )}
      </div>
    </div>
  );
};

export default SpinWheel;
