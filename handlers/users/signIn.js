const bcrypt = require("bcryptjs");
const { z } = require("zod");
const {prisma} = require("../../prisma");
const {generateJWTToken}=require("./jwt")

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
            return res.status(404).json({message:"Incorrect Username"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({message:"Incorrect Password"})
        }
        const jwttoken = generateJWTToken(username)
        res.cookie("jwt",jwttoken,{
            httpOnly: true,
        })
        return res.status(200).json({user})
    } catch (error) {
        
    }

}

module.exports = signIn