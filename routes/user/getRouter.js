import express from 'express';
import { getCategory, getProduct, getType, getProductByCate, getProductByID  } from '../../controllers/user/getAllController';

const router = express.Router();

router.get('/category', getCategory);
router.get('/type', getType);
router.get('/category/:codeCategory/:port', getProductByCate);
router.get('/product/:port', getProduct);
router.get('/productbyID/:codeProduct', getProductByID);

export default router;