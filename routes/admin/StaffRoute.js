import express from 'express';
import { createStaff, getStaff } from '../../controllers/admin/StaffController';
import { verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/staff', verifyManager, createStaff);
router.get('/staff', verifyManager, getStaff);

export default router;