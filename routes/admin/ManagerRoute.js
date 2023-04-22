import express from 'express';
import { createManager } from '../../controllers/admin/ManagerController';

const router = express.Router();

router.post('/manager', createManager);

export default router;