import {Router} from 'express';
import {ObjectId} from 'mongodb';
import {
  createEquipmentItem,
  getAllEquipmentItems,
  getEquipmentById,
  removeEquipmentItem,
  patchEquipmentItem
} from '../data/equipment.js';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    try {
      const items = await getAllEquipmentItems();
      return res.status(200).json(items);
    } catch (e) {
      return res.status(500).json({error: e});
    }
  })
  .post(async (req, res) => {
    const {name, category, location, notes, asset} = req.body;

    if (
      name === undefined ||
      category === undefined ||
      location === undefined ||
      notes === undefined ||
      asset === undefined
    ) {
      return res
        .status(400)
        .json({error: 'name, category, location, notes, and asset are all required'});
    }

    if ('status' in req.body)
      return res.status(400).json({error: 'status must not be supplied'});
    if ('checkoutHistory' in req.body)
      return res.status(400).json({error: 'checkoutHistory must not be supplied'});

    try {
      const newItem = await createEquipmentItem(name, category, location, notes, asset);
      return res.status(200).json(newItem);
    } catch (e) {
      return res.status(400).json({error: e});
    }
  });

router
  .route('/:equipmentId')
  .get(async (req, res) => {
    const equipmentId = req.params.equipmentId;
    if (typeof equipmentId !== 'string' || !ObjectId.isValid(equipmentId.trim())) {
      return res.status(400).json({error: 'equipmentId must be a valid ObjectId'});
    }

    try {
      const item = await getEquipmentById(equipmentId);
      return res.status(200).json(item);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .delete(async (req, res) => {
    const equipmentId = req.params.equipmentId;
    if (typeof equipmentId !== 'string' || !ObjectId.isValid(equipmentId.trim())) {
      return res.status(400).json({error: 'equipmentId must be a valid ObjectId'});
    }

    try {
      const result = await removeEquipmentItem(equipmentId);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(404).json({error: e});
    }
  })
  .patch(async (req, res) => {
    const equipmentId = req.params.equipmentId;
    if (typeof equipmentId !== 'string' || !ObjectId.isValid(equipmentId.trim())) {
      return res.status(400).json({error: 'equipmentId must be a valid ObjectId'});
    }

    const updateObject = req.body;
    if (
      !updateObject ||
      typeof updateObject !== 'object' ||
      Array.isArray(updateObject) ||
      Object.keys(updateObject).length === 0
    ) {
      return res
        .status(400)
        .json({error: 'request body must contain at least one field to update'});
    }

    try {
      const updated = await patchEquipmentItem(equipmentId, updateObject);
      return res.status(200).json(updated);
    } catch (e) {
      if (typeof e === 'string' && e.toLowerCase().includes('no equipment item found')) {
        return res.status(404).json({error: e});
      }
      return res.status(400).json({error: e});
    }
  });

export default router;
