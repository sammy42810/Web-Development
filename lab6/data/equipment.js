import {ObjectId} from 'mongodb';
import {equipment} from '../config/mongoCollections.js';
import {
  checkId,
  checkName,
  checkCategory,
  checkLocation,
  checkNotes,
  checkAsset,
  checkManufacturer,
  checkModelNumber,
  checkSerialNumber,
  checkReplacementCost,
  checkAcquiredOn,
  checkBorrowerName,
  checkEmail,
  checkDateMMDDYYYY,
  compareMMDDYYYY,
  getCurrentDateMMDDYYYY,
  escapeRegex
} from '../helpers.js';

const ASSET_FIELDS = ['manufacturer', 'modelNumber', 'serialNumber', 'replacementCost', 'acquiredOn'];
const EQUIPMENT_FIELDS = ['name', 'category', 'location', 'notes', 'asset'];

const assertUniqueSerialNumber = async (equipmentCollection, serialNumber, excludeId) => {
  const filter = {'asset.serialNumber': {$regex: new RegExp(`^${escapeRegex(serialNumber)}$`, 'i')}};
  if (excludeId) filter._id = {$ne: new ObjectId(excludeId)};
  const dup = await equipmentCollection.findOne(filter);
  if (dup) throw `An equipment item with serialNumber "${serialNumber}" already exists`;
};

const stringifyItem = (item) => {
  item._id = item._id.toString();
  item.checkoutHistory = (item.checkoutHistory || []).map((c) => ({
    ...c,
    _id: c._id.toString()
  }));
  return item;
};

export const createEquipmentItem = async (name, category, location, notes, asset) => {
  name = checkName(name);
  category = checkCategory(category);
  location = checkLocation(location);
  notes = checkNotes(notes);
  const assetObj = checkAsset(asset);

  const equipmentCollection = await equipment();

  await assertUniqueSerialNumber(equipmentCollection, assetObj.serialNumber);

  const newItem = {
    name,
    category,
    status: 'available',
    location,
    notes,
    asset: assetObj,
    checkoutHistory: []
  };

  const insertInfo = await equipmentCollection.insertOne(newItem);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add equipment item';

  return getEquipmentById(insertInfo.insertedId.toString());
};

export const getAllEquipmentItems = async () => {
  const equipmentCollection = await equipment();
  const items = await equipmentCollection
    .find({}, {projection: {name: 1}})
    .toArray();
  return items.map((item) => ({_id: item._id.toString(), name: item.name}));
};

export const getEquipmentById = async (id) => {
  id = checkId(id);
  const equipmentCollection = await equipment();
  const item = await equipmentCollection.findOne({_id: new ObjectId(id)});
  if (!item) throw `No equipment item found with id ${id}`;
  return stringifyItem(item);
};

export const removeEquipmentItem = async (id) => {
  id = checkId(id);
  const equipmentCollection = await equipment();
  const deleted = await equipmentCollection.findOneAndDelete({_id: new ObjectId(id)});
  if (!deleted) throw `No equipment item found with id ${id}`;
  return {name: deleted.name, deleted: true};
};

export const patchEquipmentItem = async (equipmentId, updateObject) => {
  if (equipmentId === undefined || updateObject === undefined)
    throw 'equipmentId and updateObject must both be supplied';
  equipmentId = checkId(equipmentId);

  if (typeof updateObject !== 'object' || updateObject === null || Array.isArray(updateObject))
    throw 'updateObject must be an object';

  const keys = Object.keys(updateObject);
  if (keys.length === 0) throw 'updateObject must contain at least one field to update';

  if (keys.includes('_id')) throw 'updateObject cannot contain _id';
  if (keys.includes('checkoutHistory')) throw 'updateObject cannot contain checkoutHistory';

  for (const k of keys)
    if (!EQUIPMENT_FIELDS.includes(k)) throw `updateObject contains invalid field: ${k}`;

  const equipmentCollection = await equipment();

  const setObj = {};
  if ('name' in updateObject) setObj.name = checkName(updateObject.name);
  if ('category' in updateObject) setObj.category = checkCategory(updateObject.category);
  if ('location' in updateObject) setObj.location = checkLocation(updateObject.location);
  if ('notes' in updateObject) setObj.notes = checkNotes(updateObject.notes);

  if ('asset' in updateObject) {
    const assetUpdate = updateObject.asset;
    if (typeof assetUpdate !== 'object' || assetUpdate === null || Array.isArray(assetUpdate))
      throw 'asset must be an object';

    const assetKeys = Object.keys(assetUpdate);
    if (assetKeys.length === 0) throw 'asset update object must contain at least one field';
    for (const k of assetKeys)
      if (!ASSET_FIELDS.includes(k)) throw `asset contains invalid field: ${k}`;

    if ('manufacturer' in assetUpdate)
      setObj['asset.manufacturer'] = checkManufacturer(assetUpdate.manufacturer);
    if ('modelNumber' in assetUpdate)
      setObj['asset.modelNumber'] = checkModelNumber(assetUpdate.modelNumber);
    if ('replacementCost' in assetUpdate)
      setObj['asset.replacementCost'] = checkReplacementCost(assetUpdate.replacementCost);
    if ('acquiredOn' in assetUpdate)
      setObj['asset.acquiredOn'] = checkAcquiredOn(assetUpdate.acquiredOn);
    if ('serialNumber' in assetUpdate) {
      const serialNumber = checkSerialNumber(assetUpdate.serialNumber);
      await assertUniqueSerialNumber(equipmentCollection, serialNumber, equipmentId);
      setObj['asset.serialNumber'] = serialNumber;
    }
  }

  const updated = await equipmentCollection.findOneAndUpdate(
    {_id: new ObjectId(equipmentId)},
    {$set: setObj},
    {returnDocument: 'after'}
  );
  if (!updated) throw `No equipment item found with id ${equipmentId}`;

  return stringifyItem(updated);
};

export const checkoutEquipmentItem = async (equipmentId, borrowerName, borrowerEmail, dueOn, notes) => {
  if (
    equipmentId === undefined ||
    borrowerName === undefined ||
    borrowerEmail === undefined ||
    dueOn === undefined ||
    notes === undefined
  )
    throw 'equipmentId, borrowerName, borrowerEmail, dueOn, and notes are all required';

  if (
    typeof equipmentId !== 'string' ||
    typeof borrowerName !== 'string' ||
    typeof borrowerEmail !== 'string' ||
    typeof dueOn !== 'string' ||
    typeof notes !== 'string'
  )
    throw 'equipmentId, borrowerName, borrowerEmail, dueOn, and notes must all be strings';

  equipmentId = checkId(equipmentId);
  borrowerName = checkBorrowerName(borrowerName);
  borrowerEmail = checkEmail(borrowerEmail, 'borrowerEmail');
  dueOn = checkDateMMDDYYYY(dueOn, 'dueOn');
  notes = notes.trim();

  const equipmentCollection = await equipment();
  const item = await equipmentCollection.findOne({_id: new ObjectId(equipmentId)});
  if (!item) throw `No equipment item found with id ${equipmentId}`;

  if (item.status === 'checked_out')
    throw 'This equipment item is already checked out';

  const checkedOutOn = getCurrentDateMMDDYYYY();

  if (compareMMDDYYYY(checkedOutOn, item.asset.acquiredOn) < 0)
    throw 'checkedOutOn cannot be before the asset acquiredOn date';

  if (compareMMDDYYYY(dueOn, checkedOutOn) < 0)
    throw 'dueOn must be on or after checkedOutOn';

  const checkoutRecord = {
    _id: new ObjectId(),
    borrowerName,
    borrowerEmail,
    checkedOutOn,
    dueOn,
    returnedOn: null,
    notes
  };

  const updated = await equipmentCollection.findOneAndUpdate(
    {_id: new ObjectId(equipmentId)},
    {
      $push: {checkoutHistory: checkoutRecord},
      $set: {status: 'checked_out'}
    },
    {returnDocument: 'after'}
  );
  if (!updated) throw 'Could not check out equipment item';

  return stringifyItem(updated);
};

export const checkinEquipmentItem = async (checkoutId, returnedOn) => {
  if (checkoutId === undefined) throw 'checkoutId is required';
  checkoutId = checkId(checkoutId);

  if (returnedOn === undefined) throw 'returnedOn is required';
  if (typeof returnedOn !== 'string') throw 'returnedOn must be a string';
  returnedOn = checkDateMMDDYYYY(returnedOn, 'returnedOn');

  const equipmentCollection = await equipment();
  const doc = await equipmentCollection.findOne({'checkoutHistory._id': new ObjectId(checkoutId)});
  if (!doc) throw `No checkout record found with id ${checkoutId}`;

  const record = doc.checkoutHistory.find((c) => c._id.toString() === checkoutId);
  if (!record) throw `No checkout record found with id ${checkoutId}`;
  if (record.returnedOn !== null)
    throw 'This checkout record has already been checked in';

  if (compareMMDDYYYY(returnedOn, record.checkedOutOn) < 0)
    throw 'returnedOn must be on or after checkedOutOn';

  const updated = await equipmentCollection.findOneAndUpdate(
    {_id: doc._id},
    {
      $set: {
        'checkoutHistory.$[elem].returnedOn': returnedOn,
        status: 'available'
      }
    },
    {
      arrayFilters: [{'elem._id': new ObjectId(checkoutId)}],
      returnDocument: 'after'
    }
  );
  if (!updated) throw 'Could not check in equipment item';

  return stringifyItem(updated);
};

export const overdueEquipmentItems = async () => {
  const equipmentCollection = await equipment();
  const items = await equipmentCollection.find({status: 'checked_out'}).toArray();

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const overdue = [];
  for (const item of items) {
    const active = (item.checkoutHistory || []).find((c) => c.returnedOn === null);
    if (!active) continue;

    const [mm, dd, yyyy] = active.dueOn.split('/').map(Number);
    const dueOnDate = new Date(yyyy, mm - 1, dd);

    if (dueOnDate.getTime() < today.getTime()) {
      const daysOverdue = Math.floor((today.getTime() - dueOnDate.getTime()) / (1000 * 60 * 60 * 24));
      overdue.push({
        _id: item._id.toString(),
        name: item.name,
        borrowerName: active.borrowerName,
        borrowerEmail: active.borrowerEmail,
        checkedOutOn: active.checkedOutOn,
        dueOn: active.dueOn,
        daysOverdue
      });
    }
  }

  return overdue;
};
