const { Account,Level,genealogy,User } = require("../database/models");
import { io } from "../utils/socketio";

class ComService{
   static calculate = async(req)=>{
     const account = await Account.findOne(
      { 
        where : { 
          user_id: req.user.id
        },
        include: [{
          model: Level,
          as: 'level',
          attributes: ['id','commission_rate']
        }]
      });
     const  { 
        user_id, 
        amount , 
        commission, 
        worknumber,
        level
    } = account;
     
    const commission_rate = level.commission_rate;
    const newCommission = ((amount + commission)*(commission_rate/100))/40;
    const newAmount = amount + newCommission;
    const newWork = worknumber - 1;
    await Account.update({ amount: newAmount.toFixed(3),worknumber:newWork},{where: {user_id}});
    const { inviter} = await genealogy.findOne({where: {user_id}});
    if(inviter.length != 0){
        let rater = 12;
      for(let x = 0; x < inviter.length; x++){
         const referAccount= await Account.findOne({where:{user_id: inviter[x]}})
         if(referAccount){
          const { commission } = referAccount
          const newCom = commission + newCommission*(rater/100);
          await Account.update({commission:newCom.toFixed(3)},{where:{user_id: inviter[x]}})
         rater -=4;
         }
       
      }
    }
    const acc = await Account.findOne({ 
      where :{user_id},
      include: [{
        model: User,
        as: 'owner',
        attributes: [
        'id','username','fullname','phone',"whatsapp",
        "referrer","referal_code", "role", "profilePic",
        "createdAt"
      ]
      }]
    });
    io.emit("accountDetails", acc);
    return acc;
   }
}

export default ComService;