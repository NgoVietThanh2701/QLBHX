import express from 'express';
import { createBranch, deleteBranch, getBranch, updatedBranch } from '../../controllers/admin/BranchController';

const router = express.Router();

router.post('/branch', createBranch);
router.get('/branch', getBranch);
router.patch('/branch/:codeBranch', updatedBranch);
router.delete('/branch/:codeBranch', deleteBranch);

export default router;