import {Router} from 'express';
import {ObjectId} from 'mongodb';
import {
  checkoutEquipmentItem,
  checkinEquipmentItem,
  overdueEquipmentItems
} from '../data/equipment.js';

const router = Router();

// POST /checkouts/checkout/:equipmentId
router.route('/checkout/:equipmentId').post(async (req, res) => {
  const equipmentId = req.params.equipmentId;
  if (typeof equipmentId !== 'string' || !ObjectId.isValid(equipmentId.trim())) {
    return res.status(400).json({error: 'equipmentId must be a valid ObjectId'});
  }

  const {borrowerName, borrowerEmail, dueOn, notes} = req.body;
  if (
    borrowerName === undefined ||
    borrowerEmail === undefined ||
    dueOn === undefined ||
    notes === undefined
  ) {
    return res
      .status(400)
      .json({error: 'borrowerName, borrowerEmail, dueOn, and notes are all required'});
  }
  if ('returnedOn' in req.body)
    return res.status(400).json({error: 'returnedOn must not be supplied'});

  try {
    const updated = await checkoutEquipmentItem(equipmentId, borrowerName, borrowerEmail, dueOn, notes);
    return res.status(200).json(updated);
  } catch (e) {
    if (typeof e === 'string' && e.toLowerCase().includes('no equipment item found')) {
      return res.status(404).json({error: e});
    }
    return res.status(400).json({error: e});
  }
});

// POST /checkouts/checkin/:checkoutId
router.route('/checkin/:checkoutId').post(async (req, res) => {
  const checkoutId = req.params.checkoutId;
  if (typeof checkoutId !== 'string' || !ObjectId.isValid(checkoutId.trim())) {
    return res.status(400).json({error: 'checkoutId must be a valid ObjectId'});
  }

  const {returnedOn} = req.body;
  if (returnedOn === undefined) {
    return res.status(400).json({error: 'returnedOn is required'});
  }

  try {
    const updated = await checkinEquipmentItem(checkoutId, returnedOn);
    return res.status(200).json(updated);
  } catch (e) {
    if (typeof e === 'string' && e.toLowerCase().includes('no checkout record found')) {
      return res.status(404).json({error: e});
    }
    return res.status(400).json({error: e});
  }
});

// GET /checkouts/overdue
router.route('/overdue').get(async (req, res) => {
  try {
    const overdue = await overdueEquipmentItems();
    return res.status(200).json(overdue);
  } catch (e) {
    return res.status(500).json({error: e});
  }
});

export default router;
