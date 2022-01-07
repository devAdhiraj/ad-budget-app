import { getDatabase } from 'firebase-admin/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import refreshJwt from '../../helpers/refresh-jwt';
import verifyFirebase from '../../helpers/verify-firebase';

type Data = {
  result: string
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try{
    if(req.method !== "PUT" && req.method !== "DELETE"){
      return res.status(404).json({result: "invalid http method"});
    }
    const result = await verifyFirebase(req);
    if(!result){
      return res.status(403).json({result: "Unauthorized"});
    }
    const decoded_token = await refreshJwt(req, res)
    if(!decoded_token || decoded_token === "unauthorized"){
      return res.status(403).json({result: "unauthorized"})
    }
    const {uid} = decoded_token;
    const db = getDatabase();
    const ref = db.ref("users/");
    console.log(req.query)
    const entryRef = ref.child(`${uid}/entries/${req.query.id}`);
    if(req.method === "PUT"){
      if(!req.body.amt || !req.body.date){
        return res.status(400).json({result: "missing arguments"})
      }
      entryRef.update({
        date: req.body.date,
        amt: req.body.amt
      });
      return res.status(200).json({result: "updated"});
    }
    else if(req.method === "DELETE"){
      entryRef.remove();
      return res.status(200).json({result: "deleted"})
    } else{
      return res.status(404).json({result: "error - incorrect HTTP method"})
    }
  } catch(err){
      return res.status(403).json({result: `unauthorized`});
  }

}

export default handler;
