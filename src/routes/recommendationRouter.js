import { Router } from 'express';
import * as recommendationsController from '../controllers/recommendationsController.js';

const router = new Router();

router.post('', recommendationsController.postRecommendation);
router.post('/:id/upvote', recommendationsController.postUpVote);

export default router;
