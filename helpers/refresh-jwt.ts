import type { NextApiRequest, NextApiResponse } from 'next'
import verifyFirebase from './verify-firebase'
const jwt = require('jsonwebtoken')
const Cookies = require("cookies")

const refreshJwt = async (req:NextApiRequest, res:NextApiResponse) => {
    try{
        const decoded_token = await verifyFirebase(req)
        if(!decoded_token){return "unauthorized"}
        const user_email = decoded_token.email;
        const expires = (Math.floor(Date.now() / 1000) + (24 * 60 * 60)); // 1 Day
        const token = jwt.sign({email: user_email, exp: expires}, process.env.JWT_SECRET_KEY);
        const cookies = new Cookies(req, res)
        await cookies.set("ad_token", token, {
            httpOnly:true,
            secure: process.env.NODE_ENV === "production" ? true : false,
            expires: new Date(expires * 1000),
            overwrite: true
        })
        return decoded_token;
    } catch(err){
        console.log(err)
        return "unauthorized"
    }
    
}

export default refreshJwt;