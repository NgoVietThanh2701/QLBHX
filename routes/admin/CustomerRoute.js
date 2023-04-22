import express from 'express';
import { createCustomer } from '../../controllers/admin/CustomerController';

const router = express.Router();

router.post('/customer', createCustomer);

export default router;