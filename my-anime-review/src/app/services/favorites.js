import axios from "axios";

const APP_ID = "ROdBUaSLBWBFxJ3nh89IuqYTZGMpF2t2rHcdW5E6";  
const REST_KEY = "B2BpNNbebHy485u0UF7CNIGdqA17itLvoB9ljudf"; 
const BASE_URL = "https://parseapi.back4app.com/classes/FavoriteAnime";

const headers = {
  "X-Parse-Application-Id": APP_ID,
  "X-Parse-REST-API-Key": REST_KEY,
  "Content-Type": "application/json"
};

// CREATE
export const addFavorite = async (anime) => {
  const res = await axios.post(BASE_URL, anime, { headers });
  return res.data;
};

// READ
export const getFavorites = async () => {
  const res = await axios.get(BASE_URL, { headers });
  return res.data.results;
};

// DELETE
export const deleteFavorite = async (objectId) => {
  const res = await axios.delete(`${BASE_URL}/${objectId}`, { headers });
  return res.data;
};
