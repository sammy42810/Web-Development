import {ObjectId} from 'mongodb';

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

export const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const checkEmail = (val, name = 'email') => {
  val = checkNonEmptyString(val, name);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(val)) throw `${name} must be a valid email address`;
  return val;
};

export const checkDateMMDDYYYY = (val, name) => {
  val = checkNonEmptyString(val, name);
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val))
    throw `${name} must be in MM/DD/YYYY format with leading zeros`;
  const [mm, dd, yyyy] = val.split('/').map(Number);
  const d = new Date(yyyy, mm - 1, dd);
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd)
    throw `${name} must be a valid calendar date`;
  return val;
};

export const compareMMDDYYYY = (dateA, dateB) => {
  const [mmA, ddA, yyyyA] = dateA.split('/').map(Number);
  const [mmB, ddB, yyyyB] = dateB.split('/').map(Number);
  const a = new Date(yyyyA, mmA - 1, ddA).getTime();
  const b = new Date(yyyyB, mmB - 1, ddB).getTime();
  return a - b;
};

export const getCurrentDateMMDDYYYY = () => {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const yyyy = now.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

export const checkName = (name) => {
  name = checkNonEmptyString(name, 'name');
  if (name.length < 3 || name.length > 50)
    throw 'name must be between 3 and 50 characters long';
  if (!/^[a-zA-Z0-9 \-]+$/.test(name))
    throw 'name can only contain letters, numbers, spaces, and hyphens';
  return name;
};

export const checkCategory = (category) => {
  category = checkNonEmptyString(category, 'category').toLowerCase();
  if (category.length < 2 || category.length > 30)
    throw 'category must be between 2 and 30 characters long';
  if (!/^[a-zA-Z0-9 \-]+$/.test(category))
    throw 'category can only contain letters, numbers, spaces, and hyphens';
  return category;
};

export const checkLocation = (location) => {
  location = checkNonEmptyString(location, 'location');
  if (location.length < 3 || location.length > 100)
    throw 'location must be between 3 and 100 characters long';
  if (!/^[a-zA-Z0-9 \-:;]+$/.test(location))
    throw 'location can only contain letters, numbers, spaces, hyphens, colons, and semi-colons';
  return location;
};

export const checkNotes = (notes) => {
  if (notes === undefined || notes === null) throw 'notes is required';
  if (typeof notes !== 'string') throw 'notes must be a string';
  return notes.trim();
};

export const checkManufacturer = (manufacturer) => {
  manufacturer = checkNonEmptyString(manufacturer, 'manufacturer');
  if (manufacturer.length < 2 || manufacturer.length > 50)
    throw 'manufacturer must be between 2 and 50 characters long';
  if (!/^[a-zA-Z][a-zA-Z0-9\- ]*$/.test(manufacturer))
    throw 'manufacturer must start with a letter and contain only letters, numbers, hyphens, and spaces';
  return manufacturer;
};

export const checkModelNumber = (modelNumber) => {
  modelNumber = checkNonEmptyString(modelNumber, 'modelNumber');
  if (modelNumber.length < 1 || modelNumber.length > 30)
    throw 'modelNumber must be between 1 and 30 characters long';
  if (!/^[a-zA-Z0-9\-]+$/.test(modelNumber))
    throw 'modelNumber can only contain letters, numbers, and hyphens (no spaces)';
  return modelNumber;
};

export const checkSerialNumber = (serialNumber) => {
  serialNumber = checkNonEmptyString(serialNumber, 'serialNumber');
  if (serialNumber.length < 4 || serialNumber.length > 50)
    throw 'serialNumber must be between 4 and 50 characters long';
  if (!/^[a-zA-Z0-9\-]+$/.test(serialNumber))
    throw 'serialNumber can only contain letters, numbers, and hyphens (no spaces)';
  return serialNumber;
};

export const checkReplacementCost = (replacementCost) => {
  if (replacementCost === undefined || replacementCost === null)
    throw 'replacementCost is required';
  if (typeof replacementCost === 'string') {
    const trimmed = replacementCost.trim();
    if (trimmed.length === 0) throw 'replacementCost cannot be an empty string';
    const converted = Number(trimmed);
    if (isNaN(converted) || !isFinite(converted))
      throw 'replacementCost string cannot be converted to a valid number';
    replacementCost = converted;
  }
  if (typeof replacementCost !== 'number' || !isFinite(replacementCost) || replacementCost <= 0)
    throw 'replacementCost must be a finite number greater than 0';
  return replacementCost;
};

export const checkAcquiredOn = (acquiredOn) => checkDateMMDDYYYY(acquiredOn, 'acquiredOn');

const ASSET_FIELDS = ['manufacturer', 'modelNumber', 'serialNumber', 'replacementCost', 'acquiredOn'];

export const checkAsset = (asset) => {
  if (asset === undefined || asset === null) throw 'asset is required';
  if (typeof asset !== 'object' || Array.isArray(asset)) throw 'asset must be an object';

  const keys = Object.keys(asset);
  for (const k of ASSET_FIELDS)
    if (!keys.includes(k)) throw `asset is missing required field: ${k}`;
  for (const k of keys)
    if (!ASSET_FIELDS.includes(k)) throw `asset has unexpected field: ${k}`;

  return {
    manufacturer: checkManufacturer(asset.manufacturer),
    modelNumber: checkModelNumber(asset.modelNumber),
    serialNumber: checkSerialNumber(asset.serialNumber),
    replacementCost: checkReplacementCost(asset.replacementCost),
    acquiredOn: checkAcquiredOn(asset.acquiredOn)
  };
};

export const checkBorrowerName = (name) => {
  name = checkNonEmptyString(name, 'borrowerName');
  if (name.length < 2 || name.length > 50)
    throw 'borrowerName must be between 2 and 50 characters long';
  if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ' .\-]*$/.test(name))
    throw "borrowerName can only contain letters, spaces, apostrophes, hyphens, and periods, and cannot start with a hyphen, apostrophe, or period";
  return name;
};
