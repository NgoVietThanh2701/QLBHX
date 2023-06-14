import express from 'express';
import { createCategory, deleteCategory, getCategories, updatedCategory, getCategoryByID } from '../../controllers/admin/CategoryController';
import { verifyAdmin, verifyManager} from "../../middleware/admin/AuthMiddleware";
import crypto from 'crypto'
import path from "path";
const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Xác định nơi lưu trữ tệp tin tải lên
      cb(null, './public/images/categories')
    },
    filename: function (req, file, cb) {
      // Tạo tên tệp tin mới cho tệp tin tải lên
      const ext = path.extname(file.originalname);
      const fileName = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest("hex") + ext;
      cb(null, fileName)
    }
});
const upload = multer({ storage: storage });

router.post('/category', verifyManager, verifyAdmin, upload.single("image"), createCategory);
router.get('/category', verifyManager, getCategories);
router.get('/category/:codeCategory', verifyManager, getCategoryByID);
router.patch('/category/:codeCategory', verifyManager, verifyAdmin, upload.single("image"), updatedCategory);
router.delete('/category/:codeCategory', verifyManager, verifyAdmin, deleteCategory);

export default router;