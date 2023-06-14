import express from 'express';
import { getCategory, getProduct, getType, getProductByCate, getProductByID  } from '../../controllers/user/getAllController';
import { createCustomer, getCustomer } from '../../controllers/user/CustomerController';
import { getMe, login, logout } from '../../controllers/user/AuthControllerUser';
const router = express.Router();

router.get('/category', getCategory);
router.get('/type', getType);
router.get('/category/:codeCategory/:port', getProductByCate);
router.get('/product/:port', getProduct);
router.get('/productbyID/:codeProduct', getProductByID);
// registry user
router.post('/customer', createCustomer);
router.get('/customer', getCustomer);
// auth user

router.post('/login', login);
router.get('/me', getMe);
router.delete('/logout', logout);

export default router;