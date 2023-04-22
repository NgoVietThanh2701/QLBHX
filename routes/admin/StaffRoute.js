import express from 'express';
import { createStaff } from '../../controllers/admin/StaffController';

const router = express.Router();

router.post('/staff', createStaff);

export default router;