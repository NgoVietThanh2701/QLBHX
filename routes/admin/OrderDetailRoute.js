import express from "express";
import { createOrderDetail } from "../../controllers/admin/OrderDetailController";

const router = express.Router();
router.post('/order', createOrderDetail);

export default router;