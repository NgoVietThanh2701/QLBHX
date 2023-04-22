import express from 'express';
import { createBranch } from '../../controllers/admin/BranchController';

const router = express.Router();

router.post('/branch', createBranch);

export default router;