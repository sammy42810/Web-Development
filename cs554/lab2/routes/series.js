import {Router} from 'express';
import {cacheMiddleware, detailHandler} from '../middleware.js';

const router = Router();

// GET /api/series/:id
router.get('/:id', cacheMiddleware('series'), detailHandler('series'));

export default router;