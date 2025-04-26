import express from 'express';
import { register, login, logout, loggedIn } from '../controller/userController.js'
import { protect } from '../middleware/auth.js'
const router = express.Router();

router.post('/create', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/get', protect, loggedIn)

export default router;