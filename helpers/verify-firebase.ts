import type { NextApiRequest } from "next";
import {getAuth} from "firebase-admin/auth";

const verifyFirebase = async (req:NextApiRequest) => {
    try{
    const firebase_token = req.headers.authorization?.split(" ")[1]
    if(!firebase_token){
        return false
    }
    const decoded_token = await getAuth().verifyIdToken(firebase_token);
    console.log(decoded_token)
    return decoded_token
    } catch(err){
        console.log(err)
        return false
    }
}
export default verifyFirebase;
