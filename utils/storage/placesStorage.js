import Cookies from 'js-cookie';

const PLACES_COOKIE_KEY = 'wswe_places';

export const placesStorage = {
  getPlaces: () => {
    const places = Cookies.get(PLACES_COOKIE_KEY);
    return places ? JSON.parse(places) : defaultPlaces;
  },
  
  setPlaces: (places) => {
    Cookies.set(PLACES_COOKIE_KEY, JSON.stringify(places), { expires: 365 });
  }
};

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