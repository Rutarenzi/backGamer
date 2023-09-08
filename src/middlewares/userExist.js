import { User } from "../database/models";

const userFound = async(req, res, next) => {
try{
  const { id } = req.user;
  const user = await User.findOne({ where: {id}});
  if(!user){
    return res.status(401).json({ status: 401, error:"User Not Found"})
  }
  next();
}catch(error){
    return res.status(500).json({status: 500, error:error.message})
}
}

export default userFound;