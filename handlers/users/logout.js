
function logout(req,res){
    res.cookie("jwt","",{
        httpOnly: true,
        signed:true
    })
    return res.status(200).json({message:"Successfully Logged out"})
}

module.exports=logout