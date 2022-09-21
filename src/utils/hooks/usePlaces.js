
import { useState, useEffect } from 'react';
import { databaseMethods } from '../firebase/database/databaseMethods';

const usePlaces = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    databaseMethods.getPlaces(setPlaces)
  },[]);

  return {places, setPlaces};
}

export default usePlaces;
