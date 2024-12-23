var express = require("express")
const userRouter = express.Router();
var signUp=require("../../handlers/users/signUp")

userRouter.route("/signup").post(signUp);

module.exports =userRouter;