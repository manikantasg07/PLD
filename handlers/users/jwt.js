var jwt = require("jsonwebtoken");
// let jwtSecretKey = process.env.JWT_SECRET_KEY;

function generateJWTToken(username){
    const token = jwt.sign({username},"Manikanta")
    return token;
}

module.exports={   
    generateJWTToken
}
