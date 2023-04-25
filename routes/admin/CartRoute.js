import express from "express";
import { createCart, getCart } from "../../controllers/user/CartController";

const router = express.Router();
router.post('/cart', createCart);
router.get('/cart/:id', getCart);

export default router;