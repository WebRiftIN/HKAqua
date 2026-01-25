import Router from 'express'
import { bookService } from '../controllers/serviceController.js'
import verifyToken from '../middlewares/auth.js'

const router = Router()

router.route("/book-service").post(verifyToken,bookService)

export default router