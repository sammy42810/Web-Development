import { ObjectId } from 'mongodb';

export const checkId = (id) => {
  if (id === undefined || id === null) throw 'You must provide an id.';
  if (typeof id !== 'string') throw 'Id must be a string.';
  id = id.trim();
  if (id.length === 0) throw 'Id cannot be an empty string.';
  if (!ObjectId.isValid(id)) throw 'Invalid ObjectId.';
  return id;
};
