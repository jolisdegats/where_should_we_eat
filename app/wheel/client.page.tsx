"use client";
import { useMemo, useState } from "react";
import Sidebar from "@/components/wheel/Sidebar";
import SpinWheel from "@/components/wheel/SpinWheel";
import { Place } from "@/interfaces/place";

export default function Home({
  initialPlaces,
  initialUsername,
}: {
  initialPlaces: Place[];
  initialUsername: string;
}): JSX.Element {
  const [places, setPlaces] = useState(initialPlaces);

  return (
    <div className="container px-4 min-h-screen">
      <h1 className="text-2xl text-white p-4">w.s.w.eat</h1>
      <div className="flex flex-1 h-[calc(100vh-100px)] max-w-screen-lg mx-auto">
        <Sidebar
          places={places}
          setPlaces={setPlaces}
          username={initialUsername}
        />
        <SpinWheel places={places} />
      </div>
    </div>
  );
}
