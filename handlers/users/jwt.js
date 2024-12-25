var jwt = require("jsonwebtoken");
// let jwtSecretKey = process.env.JWT_SECRET_KEY;

function generateJWTToken(username){
    const token = jwt.sign({username},"Manikanta")
    return token;
}

function verifyJWTToken(token){
    try {
        var decoded = jwt.verify(token, 'Manikanta');
        return decoded.username
      } catch(err) {
        return false
      }
}

module.exports={   
    generateJWTToken,
    verifyJWTToken
}
