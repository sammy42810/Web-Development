import {Router} from 'express';
import {asyncHandler, cacheMiddleware, detailHandler} from '../middleware.js';
import {getHistory} from '../data/history.js';

const router = Router();

// GET /api/movies/history
router.get(
  '/history',
  asyncHandler(async (req, res) => {
    const history = await getHistory();
    res.status(200).json(history);
  })
);

// GET /api/movies/:id 
router.get('/:id', cacheMiddleware('movie'), detailHandler('movie'));

export default router;