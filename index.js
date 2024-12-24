var express =require("express");
var dotenv =require("dotenv");
var cors=require("cors");
dotenv.config()

var userRoutes=require("./routes/users/userRoutes");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "http://localhost:3000", // Allowed origin
      methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
      allowedHeaders: ["Content-Type", "Authorization"], // Custom headers
      credentials: true, // Allow cookies or credentials
    })
  );

app.use("/users",userRoutes)


app.listen(4000);
console.log("Server Running")
