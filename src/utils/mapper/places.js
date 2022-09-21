import { place_mapper } from "./place"

export  const places_mapper =(places) => {

   const colors = [ "#7400B8",    "#6930C3",    "#5E60CE",    "#5390D9",    "#4EA8DE",    "#48BFE3",    "#56CFE1",    "#64DFDF",    "#72EFDD",    "#72EF0D",    "#02EF0D"]


return places.map((place, i)=> {
    return {...place_mapper(place.data()), id: place.id,color : colors[i]}})
}