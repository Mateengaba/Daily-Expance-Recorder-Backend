import express from "express";
import { LoginController, SignupController } from "../Controller/authController.js";
const router = express.Router();





// auth routs

router.post("/user/signup", SignupController);
router.post("/user/login", LoginController);


export default router;