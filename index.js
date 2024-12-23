var express =require("express");
var dotenv =require("dotenv");
dotenv.config()
var userRoutes=require("./routes/users/userRoutes")
const app = express();

app.use(express.json());

app.use("/users",userRoutes)


app.listen(4000);
console.log("Server Running")
