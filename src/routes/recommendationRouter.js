import { Router } from 'express';
import postRecommendation from '../controllers/recommendationsController.js';

const router = new Router();

router.post('', postRecommendation);

export default router;
