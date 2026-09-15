import {Router} from 'express';
import { getRecipes, getRecipeById, createRecipe, updateRecipe, addComment, removeComment, toggleLike } from '../data/recipes.js';
import {checkPage} from '../helpers.js';
import {requireLogin} from '../middleware.js';

const router = Router();
// Data-layer functions throw either {status, error} objects or plain strings (from the validation helpers, which are always bad-request/400 cases).
const sendError = (res, e) => {
  if (e && typeof e === 'object' && e.status)
    return res.status(e.status).json({error: e.error});
  return res.status(400).json({error: typeof e === 'string' ? e : 'An unexpected error occurred'});
};

router
  .route('/')
  // GET /recipes is public (no requireLogin).
  .get(async (req, res) => {
    let page;
    try {
      page = checkPage(req.query.page);
    } catch (e) {
      return res.status(400).json({error: e});
    }

    try {
      const recipeList = await getRecipes(page);
      return res.status(200).json(recipeList);
    } catch (e) {
      return sendError(res, e);
    }
  })
   // Middleware #1: must be logged in to create a recipe.
  .post(requireLogin, async (req, res) => {
    const {title, ingredients, cookingSkillRequired, steps} = req.body || {};

    if (
      title === undefined ||
      ingredients === undefined ||
      cookingSkillRequired === undefined ||
      steps === undefined
    ) {
      return res.status(400).json({
        error: 'title, ingredients, cookingSkillRequired, and steps are all required'
      });
    }

    if (req.body && ('userThatPosted' in req.body || 'comments' in req.body || 'likes' in req.body)) {
      return res.status(400).json({
        error: 'userThatPosted, comments, and likes must not be supplied'
      });
    }

    try {
      const newRecipe = await createRecipe(
        title,
        ingredients,
        cookingSkillRequired,
        steps,
        req.session.user
      );
      return res.status(200).json(newRecipe);
    } catch (e) {
      return sendError(res, e);
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const recipe = await getRecipeById(req.params.id);
      return res.status(200).json(recipe);
    } catch (e) {
      return sendError(res, e);
    }
  })
  // Middleware #1: must be logged in to update a recipe.
  .patch(requireLogin, async (req, res) => {
    if (
      !req.body ||
      typeof req.body !== 'object' ||
      Array.isArray(req.body) ||
      Object.keys(req.body).length === 0
    ) { return res.status(400).json({error: 'request body must contain at least one field to update'}); }

    try {
      const updated = await updateRecipe(req.params.id, req.body, req.session.user);
      return res.status(200).json(updated);
    } catch (e) {
      return sendError(res, e);
    }
  });

router
  .route('/:id/comments') 
  // Middleware #2: must be logged in to post a comment.
  .post(requireLogin, async (req, res) => {
    const {comment} = req.body || {};
    if (comment === undefined)
      return res.status(400).json({error: 'comment is required'});

    try {
      const recipe = await addComment(req.params.id, comment, req.session.user);
      return res.status(200).json(recipe);
    } catch (e) {
      return sendError(res, e);
    }
  });

router
  .route('/:id/likes') // A user must be logged in to like/unlike a recipe.
  .post(requireLogin, async (req, res) => {
    try {
      const recipe = await toggleLike(req.params.id, req.session.user);
      return res.status(200).json(recipe);
    } catch (e) {
      return sendError(res, e);
    }
  });


router
  .route('/:recipeId/:commentId')
  // Middleware #2: must be logged in to delete a comment.
  .delete(requireLogin, async (req, res) => {
    try {
      const recipe = await removeComment(
        req.params.recipeId,
        req.params.commentId,
        req.session.user
      );
      return res.status(200).json(recipe);
    } catch (e) {
      return sendError(res, e);
    }
  });

export default router;