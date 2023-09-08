const { User,Account, Level} = require("../database/models");


const verifyComss= async(req,res,next) =>{
    try{
      const { amount,level_id,worknumber, level } =
    await Account.findOne(
        { 
          where : { 
            user_id: req.user.id
          },
          include: [{
            model: Level,
            as: 'level',
            attributes: ['id','minimum']
          }]
        });
      if(level_id == null){
        return res.status(403).json({ status: 403, error:"recharge to the mininum"})
      } else if(amount < level.minimum ){
         return res.status(403).json({ status: 403, error: "recharge up to your level"})
      } else if(worknumber <= 0){
        return res.status(403).json({ status: 403, error: "Your survey exhausted!"})
      }
      next()
    }catch(error){
        res.status(500).json({status: 500, error: error.message})
    }
    
}

export default verifyComss