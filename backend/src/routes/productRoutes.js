import {Router} from 'express'
import {addProduct,getAllProducts, getProductById } from '../controllers/productController.js';
import upload from '../middlewares/multer.js'

const router = Router();

router.route("/addProduct").post(upload.single('image'),addProduct)
router.route("/allproducts").get(getAllProducts)
router.route("/:productId").get(getProductById)

export default router