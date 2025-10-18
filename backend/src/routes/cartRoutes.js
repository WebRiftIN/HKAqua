import { Router } from "express";
import { addToCart, getUserCart } from "../controllers/cartController.js";
import verifyJWT from "../middlewares/auth.js"
 
const router = Router()

router.route("/addToCart").post(addToCart)
router.route("/getCart").post(getUserCart)

export default router