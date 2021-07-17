import express from 'express';
import * as rootController from '../controllers/rootController.js';

const router = express.Router();

router.get('/api/users', rootController.getAllUsers);
router.post('/api/users', rootController.postUser);
router.post('/api/users/:_id/exercises', rootController.postExercise);
router.get('/api/users/:_id/logs', rootController.getExercises);

export default router;