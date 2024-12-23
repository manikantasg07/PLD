const bcrypt = require("bcryptjs");
const { z } = require("zod");
const {prisma} = require("../../prisma");

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
        return res.status(200).json({message:"Succeffully Logged in"})
    } catch (error) {
        
    }

}

module.exports = signIn