
function logout(req,res){
    res.cookie("jwt","",{
        httpOnly: true,
    })
    return res.status(200).send("Successfully Logged out")
}

module.exports=logout 