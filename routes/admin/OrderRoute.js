import express from "express";
import { createOrder, getOrderDetail, getOrders } from "../../controllers/admin/OrderController";

const router = express.Router();
router.post('/cart/:id', createOrder);
router.get('/order', getOrders);
router.get('/order/:id', getOrderDetail);

export default router;