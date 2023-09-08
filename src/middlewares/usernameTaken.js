const { User } = require("../database/models");

 const  userExist= async (req,res,next)=>{
  try{
    const { username }= req.body;
    const userFound = await User.findOne({ where:{ username } });
    if(userFound){
        return res.status(409).json({status:404,error:"Username Already Taken"});
    } 
    next();
  }catch(error){
    res.status(500).json({status:500, error:error.message});
  }
};
export default userExist;