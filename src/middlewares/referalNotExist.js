import userExist from "./usernameTaken";

const { User } = require("../database/models");

const referalCheck = async (req,res, next)=>{
    try{
       const { referrer } =req.body;
       const referalOwner = await User.findOne({ where: { referal_code:referrer}});
       if(!referalOwner){
        return res.status(403).json({status: 403, error: "Referal code does not exist"})
       }
     
       next();
    }catch(error){
       return   res.status(500).json({ status:500, error:error.message });
    }
}

export default referalCheck;