import express from 'express'
import { protect } from '../middleware/auth.js'
import { sendMessage, getAllMessage } from '../controller/converstionController.js';
const router = express.Router();

router.post('/send', protect, sendMessage);
router.get('/get/:receiverId', protect, getAllMessage);


export default router;