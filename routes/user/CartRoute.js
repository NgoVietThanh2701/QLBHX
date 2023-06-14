import express from "express";
import { createCart, getCart } from "../../controllers/user/CartController";
import { verifyUser } from "../../middleware/user/AuthMiddlewareUser";
import { createOrder } from "../../controllers/OrderController";

const router = express.Router();
router.post('/cart', verifyUser, createCart);
router.get('/cart', verifyUser, getCart);
router.post('/order', verifyUser, createOrder);

export default router;