import { User } from "../database/models";

const isDisable = async(req, res, next) => {
try{
  const { id } = req.user;
  const user = await User.findOne({ where: {id}});
  if(user){
    if(user.disable== "true"){
    return res.status(400).json({ status: 401, error:"Account Suspended"})
    }
  }
  next();
}catch(error){
    return res.status(500).json({status: 500, error:error.message})
}
}

export default isDisable;