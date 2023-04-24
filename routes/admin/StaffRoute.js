import express from 'express';
import { createStaff, deleteStaff, getStaff, updatedStaff } from '../../controllers/admin/StaffController';
import { verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/staff', verifyManager, createStaff);
router.get('/staff', verifyManager, getStaff);
router.patch('/staff/:codeStaff', verifyManager, updatedStaff);
router.delete('/staff/:codeStaff', verifyManager, deleteStaff);

export default router;