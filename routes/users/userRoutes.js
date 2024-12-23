var express = require("express")
const userRouter = express.Router();
var signUp=require("../../handlers/users/signUp")
var signIn=require("../../handlers/users/signIn")

userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);

module.exports =userRouter;