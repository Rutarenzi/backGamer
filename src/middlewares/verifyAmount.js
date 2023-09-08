const { User,Account, Level} = require("../database/models");


const verifyAmount= async(req,res,next) =>{
    try{
      const { amount } =
    await Account.findOne(
        { 
          where : { 
            user_id: req.user.id
          }
        });
      if(amount < 50){
        return res.status(403).json({ status: 403, error:"Not Enough Amount"})
      } 
      next()
    }catch(error){
        res.status(500).json({status: 500, error: error.message})
    }
    
}

export default verifyAmount