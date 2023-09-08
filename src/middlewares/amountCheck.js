const { Account } = require("../database/models");


const AmountCheck = async(req,res,next)=>{
    try{
        const { withdraw } = req.body
      const { amount }= await Account.findOne(
            {
                where: {
                    user_id: req.user.id
                }
            }
        );
        if(amount < withdraw){
            return res.status(403).json({status: 403, error: "Not Enough Amount"})
        }else if(withdraw < 0){
            return res.status(403).json({ status: 403, error: "Can't withdraw that amount"});
        }
        next()
    }catch(error){
       res.status(500).json({status: 500, error: error.message})
    }
}

export default AmountCheck