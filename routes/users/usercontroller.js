import bcrypt from "bcryptjs";
import { prisma } from "..";
import { z } from "zod";

const saltRounds=10;

const userSignUpSchema = z.object({
    firstname:z.string(),
    lastname:z.string(),
    username:z.string(),
    email:z.string().email({ message: "Invalid email address" }),
    password:z.string().min(7,{ message: "Must be 7 or more characters long" })
                       .regex(/[A-Z]/,{message:"Must include at least one uppercase letter"})
                       .regex(/[0-9]/, { message: "Must include at least one number" })
                       .regex(/[@$!%*?&#]/, { message: "Must include at least one special character" }),
    confirmPassword:z.string().refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
      })
})

async function hashPassword(password){
    try {
        const hashedPassword =  await bcrypt.hash(password,saltRounds);
        return hashedPassword
    } catch (error) {
        console.log("Hash Error: ",error);
        
    }
}

export default async function signUp(req,res){

    try {

    const {firstname,lastname,email,username,password,confirmPassword} = req.body

    userSignUpSchema.parse({
        firstname,
        lastname,
        email,
        password,
        confirmPassword
    })
    const hashedPassword = await hashPassword(password);
    const newUser=await prisma.users.create({
        data:{
            firstname,
            lastname,
            email,
            username,
            password:hashedPassword
        }
    })
    return res.status(200).json({
        user:newUser
    })
    } catch (error) {
        console.log("Error creating data: ",error);
        return res.status(500).json({
            error
        })
    }
}

