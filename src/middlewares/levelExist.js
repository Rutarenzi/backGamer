import { Level } from "../database/models";

const levelExist = async(req, res, next) => {
try{
  const { level } = req.body
  const user = await Level.findOne({ where: {id: level}});
  if(!user){
    return res.status(401).json({ status: 401, error:"Invalid Level"})
  }
  next();
}catch(error){
    return res.status(500).json({status: 500, error:error.message})
}
}

export default levelExist;