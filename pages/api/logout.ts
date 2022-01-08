// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const Cookies = require("cookies")

type Data = {
  result: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try{
    if(req.method !== "POST"){
      return res.status(404).json({result: "invalid http method"});
    }
    const cookies = new Cookies(req, res)
    cookies.set("ad_token", "token", {
      httpOnly:true,
      secure: false,
      expires: new Date(0),
      overwrite: true
    })
    return res.status(200).json({result: "success"})

  } catch(err){
    console.log(err)
    return res.status(500).json({result: `Error logging out`});
  }
}

export default handler;