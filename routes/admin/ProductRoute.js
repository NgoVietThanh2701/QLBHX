import express from 'express';
import { createProduct } from '../../controllers/admin/ProductController';

const router = express.Router();

router.post('/product',createProduct);

export default router;