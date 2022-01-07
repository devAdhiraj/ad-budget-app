// const jwt = require('jsonwebtoken');

import type { NextApiRequest, NextApiResponse } from 'next'
import refreshJwt from '../../helpers/refresh-jwt'

type Data = {
    result: string | any
  }
  
const handler = async (
req: NextApiRequest,
res: NextApiResponse<Data>
) => {
    try{
        refreshJwt(req, res)
        return res.status(200).json({result: "refreshed"})
    } catch(err){
        res.status(403).json({result: err})
    }
}
