import express from 'express';
import { createProduct, deleteProduct, getProducts, getProductByID, updateProduct } from '../../controllers/admin/ProductController';
import { verifyManager } from '../../middleware/AuthMiddleWare';
import crypto from 'crypto'
import path from "path";
const router = express.Router();

import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Xác định nơi lưu trữ tệp tin tải lên
      cb(null, './public/images/products')
    },
    filename: function (req, file, cb) {
      // Tạo tên tệp tin mới cho tệp tin tải lên
      const ext = path.extname(file.originalname);
      const fileName = crypto.createHash('md5').update(file.originalname + Date.now().toString()).digest("hex") + ext;
      cb(null, fileName)
    }
})

const upload = multer({ storage: storage });
router.post('/product', verifyManager, upload.array("images", 7), createProduct);
router.get('/product', verifyManager, getProducts);
router.get('/product/:codeProduct', verifyManager, getProductByID);
router.patch('/product/:codeProduct', verifyManager, upload.array("images", 7), updateProduct);
router.delete('/product/:codeProduct', verifyManager, deleteProduct);


export default router;