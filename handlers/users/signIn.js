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
        const user = await prisma.users.find({
            where:{
                username
            }
        })
        await bcrypt.compare(password,user.password)
    } catch (error) {
        
    }
    

}