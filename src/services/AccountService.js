const { Account,User, Level } = require("../database/models");


class AccountService {
  static getAccount = async(data) =>{
    const { id } = data;
    const account = await Account.findOne({ 
      where :{user_id : id},
      include: [{
        model: User,
        as: 'owner',
        attributes: [
        'id','username','fullname','phone',"whatsapp",
        "referrer","referal_code", "role", "profilePic",
        "token",
        "createdAt"
      ]
      }]
    });
     
   return account
  }
  static updateAccount =async (id) => {
    
   await Account.update({ worknumber: 20}, { where: { user_id: id}});
   return "survey updated"
  }
  static updateCommission= async(data)=> {
   const { user_id, commission } = data
   await Account.update({P_earning: commission, commission: 0}, {where: {user_id}})
   return "Commission updated!"
  }
  static updateLevel=async(data)=>{
    const levels = await Level.findAll();
    const {user_id,amount, level } = data
    const levelers = levels.map((item) =>{
      return item.minimum;
    });
    console.log(level)
      if(level == null){
        console.log("fuck level")
          for(let x = 0; x < levelers.length;x++){
           if(x == levelers.length -1){
               if(levelers[x] <= amount){
                   await Account.update(
                       { level_id: x+1},
                       { where: {user_id}});
                       console.log("a",x+1,amount)
                   break;
           } 
       }else {
               if(levelers[x] <= amount && amount <= levelers[x+1]){
               await Account.update(
                   {level_id: x+1},
                   { where: {user_id}});
                   console.log("bo",x+1,amount);
               break;
           }
       }
          } 
       } else{
           for(let x = 0; x < levelers.length;x++){
               if(x == levelers.length -1){
                   if(levelers[x] <= amount){
                       if(level < x+1){
                           await Account.update(
                               { level_id: x+1},
                               { where: {user_id}});
                               console.log("a",x+1,amount)
                           break;
                       }
                      
               } 
           }else {
                   if(levelers[x] <= amount && amount <= levelers[x+1]){
                       if(level < x+1){
                           await Account.update(
                               { level_id: x+1},
                               { where: { user_id}});
                               console.log("a",x+1,amount)
                           break;
                       }
               }
           }
              } 

       }
  
  }
  
  static withdraw= async(data)=> {
     const { id } = data.user;
     const { withdraw } = data.body
     
     const account = await Account.findOne({
      where: {user_id: id}
     });
     const newAmount = account.amount -withdraw;
     await Account.update({ amount: newAmount, withdraw: account.withdraw + withdraw}, { where: {user_id: id}});

     return "withdraw successfully"
  }
}

export default AccountService