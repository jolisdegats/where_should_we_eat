import { collection, getDocs, getFirestore } from "firebase/firestore/lite";
import { places_mapper } from "../../mapper/places";
import app from "../firebaseIndex";


const db = getFirestore(app);

export const databaseMethods ={
   getPlaces : async (setPlaces) =>  {
    const placesCollection = collection(db, 'places');
    const placeSnapshot = await getDocs(placesCollection);
    const placesList = places_mapper(placeSnapshot.docs)
    setPlaces(placesList)
    return placesList
},

    addPlace: async () => {
    console.log("addPlace")
    }
}