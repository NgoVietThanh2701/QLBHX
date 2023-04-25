import express from 'express';
import { createCustomer, getCustomer } from '../../controllers/admin/CustomerController';

const router = express.Router();

router.post('/customer', createCustomer);
router.get('/customer', getCustomer);

export default router;