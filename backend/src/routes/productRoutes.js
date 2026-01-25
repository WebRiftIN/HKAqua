import {Router} from 'express'
import {addProduct,getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js'
import verifyJWT from '../middlewares/adminAuth.js';

const router = Router();

router.route("/addProduct").post(verifyJWT,upload.single('image'),addProduct)
router.route("/allproducts").get(getAllProducts)
router.route("/update/:productId").put(verifyJWT,upload.single('image'),updateProduct)
router.route("/delete/:productId").delete(verifyJWT,deleteProduct)
router.route("/:productId").get(getProductById)

export default router