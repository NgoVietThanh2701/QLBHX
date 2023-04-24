import express from 'express';
import { createCategory, deleteCategory, getCategories, updatedCategory } from '../../controllers/admin/CategoryController';
import { verifyAdmin, verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/category', verifyManager, verifyAdmin, createCategory);
router.get('/category', verifyManager, getCategories);
router.patch('/category/:codeCategory', verifyManager, verifyAdmin, updatedCategory);
router.delete('/category/:codeCategory', verifyManager, verifyAdmin, deleteCategory);

export default router;