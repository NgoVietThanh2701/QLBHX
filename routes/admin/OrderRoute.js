import express from "express";
import { createOrder } from "../../controllers/admin/OrderController";

const router = express.Router();
router.post('/cart/:id', createOrder);

export default router;