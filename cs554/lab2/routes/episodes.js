import {Router} from 'express';
import {cacheMiddleware, detailHandler} from '../middleware.js';

const router = Router();

// GET /api/episodes/:id — cache check in middleware, fetch/normalize on a miss.
router.get('/:id', cacheMiddleware('episode'), detailHandler('episode'));

export default router;
