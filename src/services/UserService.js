import BcryptUtils from "../utils/brcypt";
import referal from "../utils/referalUtils";
import Jwtutils from "../utils/JwtUtils";
import redisClient from "../utils/redis";
const { User,Account,genealogy } = require("../database/models");

class UserService {
   
    static async register(data){
        const {
           username,
           fullname,
           phone,
           whatsapp,
           referrer,
           password,
          
        } = data;
         const Referal= referal();
         const user = await User.create({
           username,
           fullname,
           phone,
           whatsapp,
           referrer,
           role:"normal",
           profilePic: "https://res.cloudinary.com/dmjxukx09/image/upload/v1675844692/profiles/Profile-Avatar-PNG-Free-Download_paqfrf.png",
           referal_code : Referal,
           password: BcryptUtils.hash(password) 
         });       
        
        await  user.save();
        const owner = await User.findOne({ where: { username }});
        const account = await Account.create({
             user_id: owner.id,
             amount: 0,
             commission:0,
             worknumber: 40,
             P_earning:0,
             withdraw: 0,
        });
        await account.save();

        let inviters= [];
        let inviter = owner.referrer;
         
        for(let x=1; x <= 3; x++ ){
          let findInviter = await User.findOne({ where: {referal_code: inviter}});
          if(findInviter){
            let id =findInviter.id;
            inviters.push(id);
            inviter = findInviter.referrer;
          }else{
            break;
          }
        }

        const tree = await genealogy.create({
           user_id: owner.id,
           inviter: [...inviters]
        })
        await tree.save();
        return "registered successfully";

    }

    static async login(data){
      const { 
        id,
        username,
        fullname,
        phone,
        whatsapp,
        referal_code,
        referrer,
        role
      } = data;
      
     const token = Jwtutils.generator({
        id,
        username,
        fullname,
        phone,
        whatsapp,
        referal_code,
        referrer,
        role
      })
     const user = {
      username,
      token
     }
     
  
    await redisClient.setEx(username, 86000,token)
     return { user }
    }
    static async logout(data){
      const { user, token } = data;
      await redisClient.del(user.username)
      return "Logout successfully!"
    }
    static userUpdate = async(req)=>{
      const { id} = req.user;
      const { token } = req.body;
      console.log(id)
      console.log(req.body)
      await User.update({token}, {where: {id}});
      return "Token Submitted!!"
    }
    static adminUpdateUser = async(req) => {
      const { id } = req.params;
      const {
      username,
      fullname,
      phone,
      whatsapp,
      referrer,
      referal_code,
      role
    } = req.body
    await User.update(
     { username,
      fullname,
      phone,
      whatsapp,
      referrer,
      referal_code,
      role}, 
      {where: {id}}
    );
    return "updated Successfully"
    }
    static adminDeleteUser = async(id)=>{
       await User.destroy({ where: { id } });
      return "Deleted Successfully"
    }
}

export default UserService;