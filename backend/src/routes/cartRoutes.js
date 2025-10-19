import { Router } from "express";
import { addToCart, getUserCart, updateQuantity, removeItem, clearCart } from "../controllers/cartController.js";
import verifyJWT from "../middlewares/auth.js"
 
const router = Router()

router.route("/addToCart").post(addToCart)
router.route("/getCart").post(getUserCart)
router.route("/updateQuantity").post(updateQuantity)
router.route("/removeItem").post(removeItem)
router.route("/clearCart").post(clearCart)

export default router