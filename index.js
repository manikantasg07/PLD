import express from "express";
import { PrismaClient } from "@prisma/client";
import 'dotenv/config'
import userRoutes from "./routes/users/userRoutes.js";


export const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use("/users",userRoutes)




app.listen(4000);
console.log("Server Running")
