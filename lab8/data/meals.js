import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const searchMealsByKeyword = async (keyword) => {
  /*Function to make an axios call to search the api and return all meals matching the keyword param
  API endpoint: https://www.themealdb.com/api/json/v1/1/search.php?s={keyword}
  */
  if (keyword === undefined || typeof keyword !== 'string' || keyword.trim().length === 0) {
    throw 'You must provide a valid keyword to search for';
  }

  const {data} = await axios.get(`${BASE_URL}/search.php`, {
    params: {s: keyword.trim()}
  });

  return data.meals;
};

export const getMealById = async (id) => {
  /*Function to make an axios call to the api matching the id
 API endpoint: https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}
  */
  if (id === undefined || typeof id !== 'string' || id.trim().length === 0) {
    throw 'You must provide a valid meal id';
  }

  const {data} = await axios.get(`${BASE_URL}/lookup.php`, {
    params: {i: id.trim()}
  });

  if (!data.meals || data.meals.length === 0 || data.meals[0] === null) return null;
  return data.meals[0];
};
