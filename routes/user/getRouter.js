import express from 'express';
import { getCategory, getProduct  } from '../../controllers/user/getAllController';
import { createBranchUser, getBranchUser } from '../../controllers/user/SelectBranchController';

const router = express.Router();

router.get('/category', getCategory);
router.get('/product', getProduct);
router.post('/branch', createBranchUser)
router.get('/branch', getBranchUser);

export default router;