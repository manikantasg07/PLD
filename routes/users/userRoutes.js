var express = require("express")
const userRouter = express.Router();
var signUp=require("../../handlers/users/signUp")
var {signIn,isLoggedIn}=require("../../handlers/users/signIn")
var logout  = require("../../handlers/users/logout")

userRouter.route("/signup").post(signUp);
userRouter.route("/signin").post(signIn);
userRouter.route("/loggedIn").get(isLoggedIn)
userRouter.route("/logout").get(logout)

module.exports =userRouter;