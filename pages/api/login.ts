// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { getAuth } from 'firebase-admin/auth';
import type { NextApiRequest, NextApiResponse } from 'next'
import refreshJwt from '../../helpers/refresh-jwt';
import FirebaseServer from "../../helpers/firebase-server"

// const Cookies = require("cookies")
// const jwt = require("jsonwebtoken")

type Data = {
  result: string | any
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
    if(req.method !== "POST"){
      return res.status(404).json({result: "invalid http method"});
    }
    try{
      FirebaseServer()
      if(await refreshJwt(req, res) !== "unauthorized"){
        return res.status(200).json({result: "success"})
      }
      else{
        const private_key = process.env.PRIVATE_KEY?.replace(/\\n/g, '\n');
        console.log(private_key)
        console.log(process.env.CLIENT_ID)
        console.log(process.env.AUTH_URI)
        console.log(process.env.CLIENT_CERT_URL)

        return res.status(403).json({result: "unauthorized"})
      }
    } catch(err){
      console.log(err)
      return res.status(403).json({result:"unauthorized"})
    }
}

export default handler;