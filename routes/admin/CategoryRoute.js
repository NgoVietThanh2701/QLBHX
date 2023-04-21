import express from 'express';
import { createCategory } from '../../controllers/admin/CategoryController';

const router = express.Router();

router.post('/category',createCategory);

export default router;