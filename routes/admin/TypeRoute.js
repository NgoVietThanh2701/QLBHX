import express from 'express';
import { createType, deleteType, getTypes, updatedType, getTypeByID } from '../../controllers/admin/TypeController';
import { verifyAdmin, verifyManager} from "../../middleware/admin/AuthMiddleware";

const router = express.Router();

router.post('/type', verifyManager, verifyAdmin, createType);
router.get("/type", verifyManager,  getTypes);
router.get("/type/:codeType", verifyManager, getTypeByID);
router.patch('/type/:codeType', verifyAdmin, updatedType);
router.delete('/type/:codeType', verifyAdmin, deleteType);

export default router;