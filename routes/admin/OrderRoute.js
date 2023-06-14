import express from "express";
import { getOrderDetail, getOrders } from "../../controllers/OrderController";
import { verifyManager } from "../../middleware/admin/AuthMiddleware";

const router = express.Router();
router.get('/order', verifyManager,  getOrders);
router.get('/order/:id', verifyManager, getOrderDetail);

export default router;