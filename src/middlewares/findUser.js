const { User } =require("../database/models");

const  findUser = async (req,res,next)=>{
    try{
      const user = await User.findOne({where: { username: req.body.username}})
      
      if(user){
        req.user= user;
        return next();
      } else{
        return res.status(404).json({ status: 404, error: "User Not exist"})
      }

    }catch(error){
        return res.status(500).json({status: 500, error:"server error"})
    }
}

export default findUser;