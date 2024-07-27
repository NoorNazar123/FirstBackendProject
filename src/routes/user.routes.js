import { Router } from "express";
import { registerUser } from "../controllers/user.contraller.js";
import { upload } from "../middlewares/multer.middlewares.js";
 
const router = Router(); 

router.route("/register").post(
   upload.fields([
      {
          name: "avatar", //input filed in frontend must same name ="avatar" 
          maxCount: 1,
      },
      {
          name: "coverImage",//input filed in frontend must same name ="coverImage" 
          maxCount: 1, 
      },
   ]),
   registerUser
)

 
export default router; 