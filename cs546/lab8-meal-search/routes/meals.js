import {Router} from 'express';
import {searchMealsByKeyword, getMealById} from '../data/meals.js';
import {buildIngredientsList} from '../helpers.js';

const router = Router();

router.route('/').get(async (req, res) => {
  //code here for GET will render the home handlebars file 
  res.render('home', {title: 'Meal Search'});
});

router.route('/searchmealsbykeyword').post(async (req, res) => {
  //code here for POST this is where your form will be submitting keyword and then call your data function passing in the keyword and then rendering the search results of matching meals.
  const {keyword} = req.body;

  if (keyword === undefined || typeof keyword !== 'string' || keyword.trim().length === 0) {
    return res.status(400).render('error', {
      title: 'Meals Found',
      message: 'You must enter a search term!'
    });
  }

  const trimmedKeyword = keyword.trim();

  try {
    const meals = await searchMealsByKeyword(trimmedKeyword);

    if (!meals || meals.length === 0) {
      return res.status(404).render('searchResults', {
        title: 'Meals Found',
        keyword: trimmedKeyword,
        notFound: true
      });
    }

    return res.render('searchResults', {
      title: 'Meals Found',
      keyword: trimmedKeyword,
      meals
    });
  } catch (e) {
    return res.status(500).render('error', {
      title: 'Meals Found',
      message: 'Something went wrong while searching for meals.'
    });
  }
});

router.route('/meal/:id').get(async (req, res) => {
  //code here for GET a single meal
  const id = req.params.id;

  if (id === undefined || typeof id !== 'string' || id.trim().length === 0) {
    return res.status(400).render('error', {
      title: 'Meal Not Found',
      message: 'You must supply a valid meal id!'
    });
  }

  try {
    const meal = await getMealById(id.trim());

    if (!meal) {
      return res.status(404).render('error', {
        title: 'Meal Not Found',
        message: 'No meal found with that id!'
      });
    }

    const ingredients = buildIngredientsList(meal);

    return res.render('meal', {title: meal.strMeal, meal, ingredients});
  } catch (e) {
    return res.status(500).render('error', {
      title: 'Meal Not Found',
      message: 'Something went wrong while retrieving that meal.'
    });
  }
});

export default router;
