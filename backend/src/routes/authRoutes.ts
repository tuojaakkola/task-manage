import { Router } from 'express';
import { register, login, getMe, registerValidation, loginValidation } from '../controllers/authController.js';
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

router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);
router.get('/me', limiter, protect, getMe);

export default router;
