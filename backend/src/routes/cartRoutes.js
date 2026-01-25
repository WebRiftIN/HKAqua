import { Router } from "express";
import { addToCart, getUserCart, updateQuantity, removeItem, clearCart } from "../controllers/cartController.js";
import verifyToken from '../middlewares/auth.js'
 
const router = Router()

router.route("/addToCart").post(verifyToken,addToCart)
router.route("/getCart").post(verifyToken,getUserCart)
router.route("/updateQuantity").post(verifyToken,updateQuantity)
router.route("/removeItem").post(verifyToken,removeItem)
router.route("/clearCart").post(verifyToken,clearCart)

export default router