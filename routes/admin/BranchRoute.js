import express from 'express';
import { createBranch, deleteBranch, getBranch, updatedBranch } from '../../controllers/admin/BranchController';
import { verifyAdmin, verifyManager} from "../../middleware/admin/AuthMiddleware";

const router = express.Router();

router.post('/branch', verifyManager, verifyAdmin, createBranch);
router.get('/branch', verifyManager, verifyAdmin, getBranch);
router.patch('/branch/:codeBranch', verifyManager, verifyAdmin, updatedBranch);
router.delete('/branch/:codeBranch', verifyManager, verifyAdmin, deleteBranch);

export default router;