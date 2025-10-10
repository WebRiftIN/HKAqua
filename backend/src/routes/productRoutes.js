import {Router} from 'express'
import addProduct from '../controllers/productController.js';

const router = Router();

router.route("/addProduct").post(addProduct)

export default router