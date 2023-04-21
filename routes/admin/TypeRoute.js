import express from 'express';
import { createType } from '../../controllers/admin/TypeController';

const router = express.Router();

router.post('/type',createType);

export default router;