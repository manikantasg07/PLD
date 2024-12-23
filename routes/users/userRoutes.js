import { Router } from "express";
import signUp from "./usercontroller.js";

const userRouter = Router();

userRouter.route("/signup").post(signUp);

export default userRouter;