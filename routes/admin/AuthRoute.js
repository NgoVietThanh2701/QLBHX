import express from 'express';
import { login, logOut, me } from '../../controllers/admin/authController';

const router = express.Router();

router.post('/login', login);
router.get('/me', me);
router.delete('/logout', logOut);

export default router;