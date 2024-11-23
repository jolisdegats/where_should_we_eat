"use client";
import { useState } from "react";
import Sidebar from "@/components/wheel/blocks/Sidebar";
import SpinWheel from "@/components/wheel/blocks/SpinWheel";
import { Place } from "@/interfaces/place";

export default function Home({
  initialPlaces,
}: {
  initialPlaces: Place[];
}): JSX.Element {
  const [places, setPlaces] = useState(initialPlaces);
  const selectedItems = places.filter((item) => item.isSelected === true);

  return (
    <div className="container mx-auto px-4 min-h-screen">
      <h1 className="text-2xl text-white p-4">w.s.w.eat</h1>
      <div className="flex flex-1 h-[calc(100vh-100px)]">
        <Sidebar places={places} setPlaces={setPlaces} />
        <div className="flex-1 bg-white/10 backdrop-blur rounded-r-lg p-8 flex items-center justify-center">
          {selectedItems.length > 0 ? (
            <SpinWheel items={selectedItems} />
          ) : (
            <p className="text-white text-center">No places selected yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
