import express from 'express';
import { getCategory, getProduct  } from '../../controllers/user/getAllController';

const router = express.Router();

router.get('/category', getCategory);
router.get('/product/:port', getProduct);

export default router;