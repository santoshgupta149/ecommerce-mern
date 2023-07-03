import express  from "express";
import { 
    registerController,
    LoginController, 
    testController,
    forGotPasswordController
} from "../controller/authController.js"
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";


//router object
const router = express.Router()

//routing
//register || Method port
router.post('/register', registerController)

//login || post method
router.post('/login', LoginController)

//Forgot password || post
router.post('forgot-password', forGotPasswordController)

router.get('/test', requireSignIn, isAdmin, testController)

//protected route
router.get('/user-auth', requireSignIn, (req, res) =>{
    res.status(200).send({ok:true});
})

export default router