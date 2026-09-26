import express from 'express';
import { createAppointment, testEmail } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', createAppointment);
router.get('/test-email', testEmail);
router.post('/test-email', testEmail);

export default router;
