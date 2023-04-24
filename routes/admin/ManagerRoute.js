import express from 'express';
import { createManager, getManager } from '../../controllers/admin/ManagerController';
import { verifyAdmin, verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/manager', verifyManager, verifyAdmin, createManager);
router.get('/manager', verifyManager, verifyAdmin, getManager);

export default router;