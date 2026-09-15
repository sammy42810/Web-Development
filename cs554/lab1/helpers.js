import {ObjectId} from 'mongodb';

export const checkString = (val, name) => {
  if (val === undefined || val === null) throw `${name} is required`;
  if (typeof val !== 'string') throw `${name} must be a string`;
  return val.trim();
};

export const checkNonEmptyString = (val, name) => {
  const trimmed = checkString(val, name);
  if (trimmed.length === 0)
    throw `${name} cannot be an empty string or just spaces`;
  return trimmed;
};

export const checkId = (id, name = 'id') => {
  const trimmed = checkNonEmptyString(id, name);
  if (!ObjectId.isValid(trimmed)) throw `${name} is not a valid ObjectId`;
  return trimmed;
};


export const checkTitle = (title) => {
  return checkNonEmptyString(title, 'title');
};

export const checkIngredients = (ingredients) => {
  if (ingredients === undefined || ingredients === null)
    throw 'ingredients is required';
  if (!Array.isArray(ingredients)) throw 'ingredients must be an array';
  if (ingredients.length < 3)
    throw 'ingredients must contain at least 3 elements';

  return ingredients.map((ingredient, i) => {
    const value = checkNonEmptyString(ingredient, `ingredient at index ${i}`);
    if (value.length < 3 || value.length > 50)
      throw `ingredient at index ${i} must be between 3 and 50 characters long`;
    return value;
  });
};

export const checkSteps = (steps) => {
  if (steps === undefined || steps === null) throw 'steps is required';
  if (!Array.isArray(steps)) throw 'steps must be an array';
  if (steps.length < 5) throw 'steps must contain at least 5 elements';

  return steps.map((step, i) => {
    const value = checkNonEmptyString(step, `step at index ${i}`);
    if (value.length < 20)
      throw `step at index ${i} must be at least 20 characters long`;
    return value;
  });
};

const VALID_COOKING_SKILLS = ['Novice', 'Intermediate', 'Advanced'];

export const checkCookingSkill = (cookingSkillRequired) => {
  const value = checkNonEmptyString(cookingSkillRequired, 'cookingSkillRequired');
  if (!VALID_COOKING_SKILLS.includes(value))
    throw 'invalid cooking skill required (must be one of "Novice", "Intermediate", "Advanced")';
  return value;
};

export const checkComment = (comment) => {
  return checkNonEmptyString(comment, 'comment');
};

export const checkName = (name) => {
  const value = checkNonEmptyString(name, 'name');
  if (!/^[a-zA-Z ]+$/.test(value))
    throw 'name can only contain letters and spaces';
  if (value.length < 2)
    throw 'name must be at least 2 characters long';
  return value;
};

export const checkUsername = (username) => {
  const value = checkNonEmptyString(username, 'username');
  if (value.length < 3)
    throw 'username must be at least 3 characters long';
  if (!/^[a-zA-Z0-9]+$/.test(value))
    throw 'username must be alphanumeric (letters and numbers only)';
  return value.toLowerCase();
};

export const checkPassword = (password) => {
  if (password === undefined || password === null) throw 'password is required';
  if (typeof password !== 'string') throw 'password must be a string';
  if (/\s/.test(password)) throw 'password cannot contain spaces';
  if (password.length < 6)
    throw 'password must be at least 6 characters long';
  if (!/[a-z]/.test(password))
    throw 'password must contain at least one lowercase letter';
  if (!/[A-Z]/.test(password))
    throw 'password must contain at least one uppercase letter';
  if (!/[0-9]/.test(password))
    throw 'password must contain at least one number';
  if (!/[^a-zA-Z0-9]/.test(password))
    throw 'password must contain at least one special character';
  return password;
};


export const checkPage = (page) => {
  // page arrives from the query string, so it is a string (or undefined).
  if (page === undefined) return 1;
  if (Array.isArray(page)) throw 'page must be a single value';
  if (typeof page !== 'string') throw 'page must be a number';

  const trimmed = page.trim();
  if (trimmed.length === 0) throw 'page cannot be an empty string';

  const num = Number(trimmed);
  if (isNaN(num) || !isFinite(num)) throw 'page must be a number';
  if (!Number.isInteger(num)) throw 'page must be an integer';
  if (num <= 0) throw 'page must be a positive number';

  return num;
};