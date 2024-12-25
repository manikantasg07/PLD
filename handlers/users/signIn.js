const bcrypt = require("bcryptjs");
const { z } = require("zod");
const {prisma} = require("../../prisma");
const {generateJWTToken,verifyJWTToken}=require("./jwt");
const jsonwebtoken = require("jsonwebtoken")

const signINuserSchema=z.object({
    username:z.string(),
    password:z.string()
})

async function signIn(req,res){
    try {
        const {username,password} = req.body;
        signINuserSchema.parse({
            username,
            password
        })
        const user = await prisma.users.findUnique({
            where:{
                username
            }
        })
        if(!user){
            return res.status(404).send("Incorrect Username")
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).send("Incorrect Password")
        }
        const jwttoken = generateJWTToken(username)
        res.cookie("jwt",jwttoken,{
            httpOnly: true,
        })
        return res.status(200).json({user})
    } catch (error) {
        console.log(error)
        return res.status(500).send("Internal Server Error")
    }

}

async function isLoggedIn(req,res){
    try {
        const jwtToken=req.cookies["jwt"]
        const result = verifyJWTToken(jwtToken);
        if(!result){
            return res.status(404).send("Not Logged In")
        }
        const user = await prisma.users.findUnique({
            where:{
                username:result
            }
        })
        return res.status(200).json({user}) 
    } catch (error) {
        console.log("Error:",error);
        return res.status(500).send("Internal Server Error")
    }
}

module.exports = {signIn,isLoggedIn}