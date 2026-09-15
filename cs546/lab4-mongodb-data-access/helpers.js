import { ObjectId } from 'mongodb';

export const checkString = (val, name) => {
  if (val === undefined || val === null) throw `${name} is required`;
  if (typeof val !== 'string') throw `${name} must be a string`;
  return val.trim();
};

export const checkNonEmptyString = (val, name) => {
  const trimmed = checkString(val, name);
  if (trimmed.length === 0) throw `${name} cannot be an empty string or just spaces`;
  return trimmed;
};

export const checkId = (id) => {
  const trimmed = checkNonEmptyString(id, 'id');
  if (!ObjectId.isValid(trimmed)) throw 'id is not a valid ObjectId';
  return trimmed;
};
