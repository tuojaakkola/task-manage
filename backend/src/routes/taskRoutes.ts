import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  createTaskValidation,
  updateTaskValidation
} from '../controllers/taskController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validator.js';
import rateLimit from 'express-rate-limit';

// Rate limiter: max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: 'Too many requests, please try again later.'
});

const router = Router();

// All routes require authentication
router.use(protect, limiter);

router.route('/')
  .get(getTasks)
  .post(validate(createTaskValidation), createTask);

router.route('/:id')
  .get(getTask)
  .put(validate(updateTaskValidation), updateTask)
  .delete(deleteTask);

export default router;
