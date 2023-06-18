import express  from "express";
import { 
    registerController,
    LoginController, 
    testController
} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";


//router object
const router = express.Router()

//routing
//register || Method port
router.post('/register', registerController)

//login || post method
router.post('/login', LoginController)

router.get('/test', requireSignIn, isAdmin, testController)


export default router