import express from 'express';
import { createWarehouse, deleteWarehouse, getWarehouse, updatedWarehouse, getWarehouseByID } from '../../controllers/admin/WarehouseController';
import { verifyAdmin, verifyManager} from "../../middleware/admin/AuthMiddleware";

const router = express.Router();

router.post('/warehouse', verifyManager, createWarehouse);
router.get('/warehouse', verifyManager, getWarehouse);
router.get('/warehouse/:codeWarehouse', verifyManager, getWarehouseByID);
router.patch('/warehouse/:codeWarehouse',verifyManager, updatedWarehouse);
router.delete('/warehouse/:codeWarehouse', verifyManager, deleteWarehouse);

export default router;