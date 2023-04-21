import express from 'express';
import { createBranch } from '../../controllers/admin/BranchController';

const router = express.Router();

router.post('/brach',createBranch);

export default router;