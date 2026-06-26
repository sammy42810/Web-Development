//import mongo collection and ObjectId as shown in the lecture code.
import { ObjectId } from 'mongodb';
import { bands } from '../config/mongoCollections.js';
import { checkId } from '../helpers.js';

export const getAllBands = async () => {
  // The data function to get all bands from the database and return them as an array
  const bandsCollection = await bands();
  return await bandsCollection.find({}).toArray();
};

export const getBandById = async (id) => {
  // The data function to get a single band by its _id. Make sure you validate the id input paramter as shown in the lecture code. The id input paramter should be a string, should not be a string of just empty spaces, and must be a valid ObjectId
  id = checkId(id);
  const bandsCollection = await bands();
  const band = await bandsCollection.findOne({ _id: new ObjectId(id) });
  if (!band) throw 'No band found with that id.';
  return band;
};
