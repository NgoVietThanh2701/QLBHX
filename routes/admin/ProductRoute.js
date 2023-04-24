import express from 'express';
import { createProduct, deleteProduct, getProducts } from '../../controllers/admin/ProductController';
import { verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/product', verifyManager, createProduct);
router.get('/product', verifyManager, getProducts);
router.delete('/product/:codeProduct', verifyManager, deleteProduct);

export default router;