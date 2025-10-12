import {Router} from 'express'
import addProduct from '../controllers/productController.js';
import upload from '../middlewares/multer.js'

const router = Router();

router.route("/addProduct").post(upload.single('image'),addProduct)

export default router