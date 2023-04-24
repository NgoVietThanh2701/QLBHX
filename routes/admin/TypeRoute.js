import express from 'express';
import { createType, deleteType, getTypes, updatedType } from '../../controllers/admin/TypeController';
import { verifyAdmin, verifyManager } from '../../middleware/AuthMiddleWare';

const router = express.Router();

router.post('/type', verifyManager, verifyAdmin, createType);
router.get("/type", verifyManager, getTypes);
router.patch('/type/:codeType', verifyAdmin, updatedType);
router.delete('/type/:codeType', verifyAdmin, deleteType);

export default router;