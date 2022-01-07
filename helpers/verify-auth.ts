const jwt = require("jsonwebtoken")

const verifyAuth = (cookie:string) => {
    try{
        const ad_token = cookie.split("=")[1]
        if(!ad_token){
            return false;
        }
        const decoded = jwt.verify(ad_token, process.env.JWT_SECRET_KEY)
        if(!decoded){
            return false;
        }
        return decoded.email || false;
    } catch(err){
        return false;
    }
}

export default verifyAuth;
