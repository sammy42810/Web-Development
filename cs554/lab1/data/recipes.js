import {ObjectId} from 'mongodb';
import {recipes} from '../config/mongoCollections.js';
import { checkId, checkTitle, checkIngredients, checkSteps,checkCookingSkill, checkComment } from '../helpers.js';

const RECIPES_PER_PAGE = 50;
const UPDATABLE_FIELDS = ['title', 'ingredients', 'cookingSkillRequired', 'steps'];

const stringifyRecipe = (recipe) => {
  recipe._id = recipe._id.toString();
  recipe.userThatPosted = {
    _id: recipe.userThatPosted._id.toString(),
    username: recipe.userThatPosted.username
  };
  recipe.comments = (recipe.comments || []).map((c) => ({
    _id: c._id.toString(),
    userThatPostedComment: {
      _id: c.userThatPostedComment._id.toString(),
      username: c.userThatPostedComment.username
    },
    comment: c.comment
  }));
  recipe.likes = (recipe.likes || []).map((id) => id.toString());
  return recipe;
};

// Validate the shape of the logged-in user handed down from the session.
const checkSessionUser = (currentUser) => {
  if (!currentUser || typeof currentUser !== 'object')
    throw {status: 403, error: 'You must be logged in'};
  const _id = checkId(currentUser._id, 'user _id');
  if (typeof currentUser.username !== 'string' || currentUser.username.trim().length === 0)
    throw {status: 403, error: 'You must be logged in'};
  return {_id, username: currentUser.username};
};

export const getRecipes = async (page = 1) => {
  const recipeCollection = await recipes();
  const skip = (page - 1) * RECIPES_PER_PAGE;

  const recipeList = await recipeCollection
    .find({})
    .skip(skip)
    .limit(RECIPES_PER_PAGE)
    .toArray();

  if (recipeList.length === 0)
    throw {status: 404, error: 'There are no more recipes'};

  return recipeList.map(stringifyRecipe);
};

export const getRecipeById = async (id) => {
  id = checkId(id);
  const recipeCollection = await recipes();
  const recipe = await recipeCollection.findOne({_id: new ObjectId(id)});
  if (!recipe) throw {status: 404, error: `No recipe found with id ${id}`};
  return stringifyRecipe(recipe);
};

export const createRecipe = async (title, ingredients, cookingSkillRequired, steps, currentUser) => {
  title = checkTitle(title);
  ingredients = checkIngredients(ingredients);
  steps = checkSteps(steps);
  cookingSkillRequired = checkCookingSkill(cookingSkillRequired);
  const user = checkSessionUser(currentUser);

  const newRecipe = {
    title,
    ingredients,
    cookingSkillRequired,
    steps,
    userThatPosted: {
      _id: new ObjectId(user._id),
      username: user.username
    },
    comments: [],
    likes: []
  };

  const recipeCollection = await recipes();
  const insertInfo = await recipeCollection.insertOne(newRecipe);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw {status: 500, error: 'Could not add recipe'};

  return getRecipeById(insertInfo.insertedId.toString());
};

export const updateRecipe = async (id, updateObject, currentUser) => {
  id = checkId(id);
  const user = checkSessionUser(currentUser);
  if (updateObject === undefined || updateObject === null ||
      typeof updateObject !== 'object' || Array.isArray(updateObject))
    throw {status: 400, error: 'request body must be an object'};

  const keys = Object.keys(updateObject);
  if (keys.length === 0)
    throw {status: 400, error: 'at least one field must be supplied to update'};

  for (const key of keys) {
    if (key === 'comments' || key === 'likes' || key === 'userThatPosted')
      throw {status: 400, error: `you cannot update the ${key} field on this route`};
    if (!UPDATABLE_FIELDS.includes(key))
      throw {status: 400, error: `invalid field in request body: ${key}`};
  }


  const recipeCollection = await recipes();
  const existing = await recipeCollection.findOne({_id: new ObjectId(id)});
  if (!existing) throw {status: 404, error: `No recipe found with id ${id}`};
  if (existing.userThatPosted._id.toString() !== user._id)
    throw {status: 403, error: 'You can only update a recipe that you posted'};

  const setObj = {};

  if ('title' in updateObject) {
    const title = checkTitle(updateObject.title);
    if (title !== existing.title) setObj.title = title;
  }
  if ('cookingSkillRequired' in updateObject) {
    const cookingSkillRequired = checkCookingSkill(updateObject.cookingSkillRequired);
    if (cookingSkillRequired !== existing.cookingSkillRequired)
      setObj.cookingSkillRequired = cookingSkillRequired;
  }
  if ('ingredients' in updateObject) {
    const ingredients = checkIngredients(updateObject.ingredients);
    if (JSON.stringify(ingredients) !== JSON.stringify(existing.ingredients))
      setObj.ingredients = ingredients;
  }
  if ('steps' in updateObject) {
    const steps = checkSteps(updateObject.steps);
    if (JSON.stringify(steps) !== JSON.stringify(existing.steps))
      setObj.steps = steps;
  }
  if (Object.keys(setObj).length === 0)
    throw {status: 400, error: 'no fields were different from what is already stored'};

  const updated = await recipeCollection.findOneAndUpdate(
    {_id: new ObjectId(id)},
    {$set: setObj},
    {returnDocument: 'after'}
  );
  if (!updated) throw {status: 404, error: `No recipe found with id ${id}`};

  return stringifyRecipe(updated);
};

export const addComment = async (recipeId, comment, currentUser) => {
  recipeId = checkId(recipeId, 'recipeId');
  comment = checkComment(comment);
  const user = checkSessionUser(currentUser);

  const recipeCollection = await recipes();
  const existing = await recipeCollection.findOne({_id: new ObjectId(recipeId)});
  if (!existing) throw {status: 404, error: `No recipe found with id ${recipeId}`};

  const newComment = {
    _id: new ObjectId(),
    userThatPostedComment: {
      _id: new ObjectId(user._id),
      username: user.username
    },
    comment
  };

  const updated = await recipeCollection.findOneAndUpdate(
    {_id: new ObjectId(recipeId)},
    {$push: {comments: newComment}},
    {returnDocument: 'after'}
  );
  if (!updated) throw {status: 500, error: 'Could not add comment'};

  return stringifyRecipe(updated);
};

export const removeComment = async (recipeId, commentId, currentUser) => {
  recipeId = checkId(recipeId, 'recipeId');
  commentId = checkId(commentId, 'commentId');
  const user = checkSessionUser(currentUser);

  const recipeCollection = await recipes();
  const existing = await recipeCollection.findOne({_id: new ObjectId(recipeId)});
  if (!existing) throw {status: 404, error: `No recipe found with id ${recipeId}`};

  const comment = (existing.comments || []).find(
    (c) => c._id.toString() === commentId
  );
  if (!comment)
    throw {status: 404, error: `No comment found with id ${commentId}`};
  if (comment.userThatPostedComment._id.toString() !== user._id)
    throw {status: 403, error: 'You can only delete a comment that you posted'};

  const updated = await recipeCollection.findOneAndUpdate(
    {_id: new ObjectId(recipeId)},
    {$pull: {comments: {_id: new ObjectId(commentId)}}},
    {returnDocument: 'after'}
  );
  if (!updated) throw {status: 500, error: 'Could not delete comment'};

  return stringifyRecipe(updated);
};


export const toggleLike = async (recipeId, currentUser) => {
  recipeId = checkId(recipeId, 'recipeId');
  const user = checkSessionUser(currentUser);

  const recipeCollection = await recipes();
  const existing = await recipeCollection.findOne({_id: new ObjectId(recipeId)});
  if (!existing) throw {status: 404, error: `No recipe found with id ${recipeId}`};

  const alreadyLiked = (existing.likes || []).some((id) => id.toString() === user._id);
  const updateOperation = alreadyLiked
    ? {$pull: {likes: user._id}}
    : {$push: {likes: user._id}};

  const updated = await recipeCollection.findOneAndUpdate(
    {_id: new ObjectId(recipeId)},
    updateOperation,
    {returnDocument: 'after'}
  );
  if (!updated) throw {status: 500, error: 'Could not update likes'};

  return stringifyRecipe(updated);
};