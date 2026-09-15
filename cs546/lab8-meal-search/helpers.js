export const validateKeyword = (keyword) => {
  if (keyword === undefined || typeof keyword !== 'string' || keyword.trim().length === 0) {
    throw 'You must enter a search term!';
  }
  return keyword.trim();
};

export const validateId = (id) => {
  if (id === undefined || typeof id !== 'string' || id.trim().length === 0) {
    throw 'You must supply a valid meal id!';
  }
  return id.trim();
};

export const buildIngredientsList = (meal) => {
  if (!meal || typeof meal !== 'object') throw 'meal must be an object';

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (typeof ingredient === 'string' && ingredient.trim().length > 0) {
      if (typeof measure === 'string' && measure.trim().length > 0) {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
      } else {
        ingredients.push(ingredient.trim());
      }
    }
  }

  return ingredients;
};
