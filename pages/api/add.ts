import { getDatabase } from 'firebase-admin/database';
import type { NextApiRequest, NextApiResponse } from 'next'
import refreshJwt from '../../helpers/refresh-jwt';
import verifyFirebase from '../../helpers/verify-firebase';

type Data = {
  result: string,
  newId?: string | null
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  try{
    if(req.method !== "POST"){
      return res.status(404).json({result: "invalid http method"});
    }
    if(!req.body.amt || !req.body.date || !req.body.description){
        return res.status(400).json({result: "missing arguments"})
    }
    const result = await verifyFirebase(req);
    if(!result){
        return res.status(403).json({result: "Unauthorized"});
    }
    const {uid} = result;
    refreshJwt(req, res)
    const db = getDatabase();
    const ref = db.ref("users");
    const entryRef = ref.child(`${uid}/entries/`);
    const pushRef = await entryRef.push({
            date: req.body.date,
            amt: req.body.amt,
            description: req.body.description
        });
        return res.status(200).json({result: "success", newId:  pushRef.key?.toString() || null});
  } catch(err){
    return res.status(403).json({result: `Unauthorized - ${err}`});
  }
}

export default handler;
