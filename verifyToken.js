const jwt = require("jsonwebtoken")

function auth(req,res,next){
    const token = req.header("auth_token")
    if(!token) return res.status(400).send("access denied")

    try {
        const varified = jwt.verify(token ,  process.env.TOKEN_SECRET)
        req.loginUser = varified;
    } catch (error) {
        console.log(error)
    }
}

module.exports = auth;