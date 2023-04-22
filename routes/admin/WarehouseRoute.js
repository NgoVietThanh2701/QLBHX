import express from 'express';
import { createWarehouse } from '../../controllers/admin/WarehouseController';

const router = express.Router();

router.post('/warehouse',createWarehouse);

export default router;