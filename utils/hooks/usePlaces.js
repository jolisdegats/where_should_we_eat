'use client';
import { useState, useEffect } from 'react';

const defaultPlaces = [
  {
    isSelected: true,
    id: 1,
    name: "Raphael",
    link: "",
    color: "#7400B8",
  },
  {
    isSelected: true,
    id: 2,
    name: "Italien",
    link: "",
    color: "#6930C3",
  },
  {
    isSelected: true,
    id: 3,
    name: "Sushi",
    link: "",
    color: "#5E60CE",
  },
  {
    isSelected: true,
    id: 4,
    name: "Coréen",
    link: "",
    color: "#5390D9",
  },
  {
    isSelected: true,
    id: 5,
    name: "Soupe",
    link: "",
    color: "#4EA8DE",
  },
  {
    isSelected: true,
    id: 6,
    name: "Burger",
    link: "",
    color: "#48BFE3",
  },
  {
    isSelected: true,
    id: 7,
    name: "Bagel",
    link: "",
    color: "#56CFE1",
  },
  {
    isSelected: true,
    id: 8,
    name: "Pegast",
    link: "",
    color: "#64DFDF",
  },
  {
    isSelected: true,
    id: 9,
    name: "Jour",
    link: "",
    color: "#72EFDD",
  },
  {
    isSelected: true,
    id: 10,
    name: "Napoli Gang",
    link: "",
    color: "#72EF0D",
  }
];

const STORAGE_KEY = 'wswe_places';

const usePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedPlaces = localStorage.getItem(STORAGE_KEY);
        console.log('Stored places:', storedPlaces);
        if (storedPlaces) {
          setPlaces(JSON.parse(storedPlaces));
        } else {
          console.log('Using default places');
          setPlaces(defaultPlaces);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
        }
      } catch (error) {
        console.error('Error loading places:', error);
        setPlaces(defaultPlaces);
      }
    }
  }, []);

  const updatePlaces = (newPlaces) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPlaces));
      setPlaces(newPlaces);
    } catch (error) {
      console.error('Error saving places:', error);
    }
  };

  const resetPlaces = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPlaces));
      setPlaces(defaultPlaces);
    } catch (error) {
      console.error('Error resetting places:', error);
    }
  };

  console.log('Current places:', places);

  return { 
    places, 
    setPlaces: updatePlaces,
    resetPlaces
  };
};

export default usePlaces; 