import express from 'express';
import { createWarehouse, deleteWarehouse, getWarehouse, updatedWarehouse } from '../../controllers/admin/WarehouseController';
import { verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/warehouse', verifyManager, createWarehouse);
router.get('/warehouse', verifyManager, getWarehouse);
router.patch('/warehouse/:codeWarehouse',verifyManager, updatedWarehouse);
router.delete('/warehouse/:codeWarehouse', verifyManager, deleteWarehouse);

export default router;