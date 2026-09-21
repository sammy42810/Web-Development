import {Router} from 'express';
import {asyncHandler} from '../middleware.js';
import {readStats} from '../data/cache.js';

const router = Router();

// GET /api/cache/stats (extra credit)
router.get(
  '/stats',
  asyncHandler(async (req, res) => {
    const stats = await readStats();
    res.status(200).json(stats);
  })
);

export default router;