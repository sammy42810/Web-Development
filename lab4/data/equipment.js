import { ObjectId } from 'mongodb';
import { equipment } from '../config/mongoCollections.js';
import { checkString, checkNonEmptyString, checkId } from '../helpers.js';

const VALID_CATEGORIES = ['camera', 'audio', 'lighting', 'tripod', 'laptop', 'accessory'];

const checkName = (name) => {
  name = checkNonEmptyString(name, 'name');
  if (name.length < 3 || name.length > 50)
    throw 'name must be between 3 and 50 characters long';
  if (!/^[a-zA-Z0-9 \-]+$/.test(name))
    throw 'name can only contain letters, numbers, spaces, and hyphens';
  return name;
};


const checkLocation = (location) => {
  location = checkNonEmptyString(location, 'location');
  if (location.length < 3 || location.length > 100)
    throw 'location must be between 3 and 100 characters long';

  if (!/^[a-zA-Z0-9 \-:;]+$/.test(location))
    throw 'location can only contain letters, numbers, spaces, hyphens, colons, and semi-colons';
  return location;
};

const checkNotes = (notes) => {
  if (notes === undefined || notes === null) throw 'notes is required';
  if (typeof notes !== 'string') throw 'notes must be a string';
  notes = notes.trim();
  if (/(.)\1{4,}/.test(notes))
    throw 'notes cannot contain the same character repeated 5 or more times';
  return notes;
};

const checkAcquiredOn = (val) => {
  val = checkNonEmptyString(val, 'acquiredOn');
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) throw 'acquiredOn must be in MM/DD/YYYY format with leading zeros';
  const [mm, dd, yyyy] = val.split('/').map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd)
    throw 'acquiredOn must be a valid calendar date';
  return val;
};

const checkAsset = (asset) => {
  if (asset === undefined || asset === null) throw 'asset is required';
  if (typeof asset !== 'object' || Array.isArray(asset)) throw 'asset must be an object';

  const required = ['manufacturer', 'modelNumber', 'serialNumber', 'replacementCost', 'acquiredOn'];
  const keys = Object.keys(asset);

  for (const k of required)
    if (!keys.includes(k)) throw `asset is missing required field: ${k}`;
  for (const k of keys)
    if (!required.includes(k)) throw `asset has unexpected field: ${k}`;

  const manufacturer = checkNonEmptyString(asset.manufacturer, 'manufacturer');
  if (manufacturer.length < 2 || manufacturer.length > 50)
    throw 'manufacturer must be between 2 and 50 characters long';
  if (!/^[a-zA-Z][a-zA-Z0-9\- ]*$/.test(manufacturer))
    throw 'manufacturer must start with a letter and contain only letters, numbers, hyphens, and spaces';

  const modelNumber = checkNonEmptyString(asset.modelNumber, 'modelNumber');
  if (modelNumber.length < 2 || modelNumber.length > 30)
    throw 'modelNumber must be between 2 and 30 characters long';
  if (!/^[a-zA-Z0-9\-]+$/.test(modelNumber))
    throw 'modelNumber can only contain letters, numbers, and hyphens (no spaces)';

  const serialNumber = checkNonEmptyString(asset.serialNumber, 'serialNumber');
  if (serialNumber.length < 8 || serialNumber.length > 50)
    throw 'serialNumber must be between 8 and 50 characters long';
  if (!/^[A-Z0-9\-]+$/.test(serialNumber))
    throw 'serialNumber can only contain uppercase letters, numbers, and hyphens (no spaces)';


  let replacementCost = asset.replacementCost;
  if (replacementCost === undefined || replacementCost === null)
    throw 'replacementCost is required';
  if (typeof replacementCost === 'string') {
    const converted = Number(replacementCost);
    if (isNaN(converted) || !isFinite(converted))
      throw 'replacementCost string cannot be converted to a valid number';
    replacementCost = converted;
  }
  if (typeof replacementCost !== 'number' || !isFinite(replacementCost) || replacementCost <= 0)
    throw 'replacementCost must be a finite number greater than 0';

  const acquiredOn = checkAcquiredOn(asset.acquiredOn);

  return { manufacturer, modelNumber, serialNumber, replacementCost, acquiredOn };
};

export const createEquipmentItem = async (name, category, location, notes, asset) => {
  name = checkName(name);

  if (category === undefined || category === null) throw 'category is required';
  if (typeof category !== 'string') throw 'category must be a string';
  category = category.trim().toLowerCase();
  if (category.length === 0) throw 'category cannot be an empty string or just spaces';
  if (!VALID_CATEGORIES.includes(category))
    throw `category must be one of: ${VALID_CATEGORIES.join(', ')}`;

  location = checkLocation(location);
  notes = checkNotes(notes);
  const assetObj = checkAsset(asset);

  const equipmentCollection = await equipment();

  const dupName = await equipmentCollection.findOne({
    name: { $regex: new RegExp(`^${name}$`, 'i') }
  });
  if (dupName) throw `An equipment item named "${name}" already exists`;

  const dupSerial = await equipmentCollection.findOne({
    'asset.serialNumber': { $regex: new RegExp(`^${assetObj.serialNumber}$`, 'i') }
  });
  if (dupSerial) throw `An equipment item with serialNumber "${assetObj.serialNumber}" already exists`;

  const newItem = { name, category, status: 'available', location, notes, asset: assetObj };

  const insertInfo = await equipmentCollection.insertOne(newItem);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add equipment item';

  return getEquipmentById(insertInfo.insertedId.toString());
};

export const getAllEquipmentItems = async () => {
  const equipmentCollection = await equipment();
  let items = await equipmentCollection.find({}).toArray();
  return items.map((item) => {
    item._id = item._id.toString();
    return item;
  });
};

export const getEquipmentById = async (id) => {
  id = checkId(id);
  const equipmentCollection = await equipment();
  const item = await equipmentCollection.findOne({ _id: new ObjectId(id) });
  if (!item) throw `No equipment item found with id ${id}`;
  item._id = item._id.toString();
  return item;
};

export const removeEquipmentItem = async (id) => {
  id = checkId(id);
  const equipmentCollection = await equipment();
  const deleted = await equipmentCollection.findOneAndDelete({ _id: new ObjectId(id) });
  if (!deleted) throw `No equipment item found with id ${id}`;
  return { name: deleted.name, deleted: true };
};

export const updateEquipmentLocation = async (id, newLocation) => {
  id = checkId(id);
  newLocation = checkLocation(newLocation);

  const equipmentCollection = await equipment();
  const current = await equipmentCollection.findOne({ _id: new ObjectId(id) });
  if (!current) throw `No equipment item found with id ${id}`;

  if (current.location.toLowerCase() === newLocation.toLowerCase())
    throw 'newLocation is the same as the current location';

  const updated = await equipmentCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { location: newLocation } },
    { returnDocument: 'after' }
  );
  if (!updated) throw `Could not update location for equipment item with id ${id}`;
  updated._id = updated._id.toString();
  return updated;
};
