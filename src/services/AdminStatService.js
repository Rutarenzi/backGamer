const { Account,User,Deposit,withdraw } = require("../database/models");
import { Op } from "sequelize";

class AdminStatService{
   static getAllStat = async()=>{
    let StatObj ={};
     const users = await User.findAll();
      if(users.length !=0){
        StatObj.users=users.length
      }else{
        StatObj.users= 0
      }
     const accounts = await  Account.findAll();
    if(accounts.length != 0){
        const totalAmount = accounts.map((item)=>{
            return item.amount
         }).reduce((sum,next)=> sum + next);
       StatObj.totalAmount =totalAmount
    }else{
        StatObj.totalAmount= 0
    }
     const deposits = await Deposit.findAll({where: {payment_status: "confirmed"}});
     
    if(deposits.length != 0){
        const totalDeposit = deposits.map((item)=> {
            return item.amount_received
         }).reduce((sum,next)=>{
            sum+next
         });
         StatObj.totalDeposit = totalDeposit
    }else{
        StatObj.totalDeposit=0
    }

     const withdrawsR = await Account.findAll({where:{
        withdraw:{
            [Op.gt]:0
        }
     }});
    if(withdrawsR.length != 0){
        const totalWithdrawR = withdrawsR.map((item)=>{
            return item.withdraw
         }).reduce((sum,next)=>{
            sum+next
         });
         StatObj.totalWithdrawR= totalWithdrawR
    }else{
        StatObj.totalWithdrawR= 0
    }

     const paidOut = await withdraw.findAll();
   
   if(paidOut.length != 0){
    const totalpaidOut = paidOut.map((item)=>{
        return item.payout_amount
     }).reduce((sum,next)=>{
       return sum+next
     });
     StatObj.totalpaidOut= totalpaidOut
   }else{
    StatObj.totalpaidOut= 0
   }

    
    return StatObj
   }
   static getOneStat=async(req)=>{
    let StatObj2 ={}
    const {id} = req.params
    const UserSta = await User.findOne({where:{id}});
    
     if(UserSta){
        StatObj2.status = UserSta.disable
     }else{
        StatObj2.Status ="false"
     }
     
     const depositer = await Deposit.findAll({where: {
        payment_status:"confirmed",
        user_id: UserSta.id
    }})
    
     if(depositer.length !=0){
        const AllDeposit = depositer.map((item)=>{
             return item.amount_received
        }).reduce((sum,next)=>{
            sum+next
        });
        StatObj2.AllDeposit=AllDeposit
     }else{
        StatObj2.AllDeposit= 0;
     }
    
     const paidOneOut = await withdraw.findAll({
        where: {
            user_id: UserSta.id
        }
     });
     if(paidOneOut.length != 0){
        const AllWithdraw =paidOneOut.map((item)=>{
            return item.withdraw
        }).reduce((sum,next)=>{
            sum+next
        });
        StatObj2.AllWithdraw = AllWithdraw
     }else{
        StatObj2.AllWithdraw = 0
     }
     
     const people = await User.findAll({
        where:{referrer: UserSta.referal_code }
     })
     if(people.length !=0){
        StatObj2.people = people.length
     }else{
        StatObj2.people =0
     }
     return StatObj2
   }
   static newUser=async()=>{
    const hours24 = new Date();
    hours24.setHours(hours24.getHours()-24);
    const users= await User.findAll({
        where:{
            createdAt: {
                [Op.gte]:hours24
            }
        },
        attributes: [
            'id','username','fullname','phone',"whatsapp",
            "referrer","referal_code","createdAt"
          ],
        include: [{
            model: Account,
            as: 'account',
            attributes: [
            'amount',"level_id"
          ]
          }]
    });
    return users
   }
   static getUser =async(id)=> {
     const user = await User.findOne({
        where: {id},
        attributes: [
            "id",
            "username",
            "fullname",
            "phone",
            "whatsapp",
            "referrer",
            "referal_code",
            "role"
        ]});
     return user
   }
   static getAllUser=async()=>{
    const userAll = await User.findAll({
        attributes: [
            "id",
            "username",
            "fullname",
            "phone",
            "whatsapp",
            "referrer",
            "referal_code",
            "role",
            "createdAt"
        ],
        include:[{
            model:Account,
            as: "account",
            attributes: [
                "commission",
                "amount",
                "level_id",
                "withdraw",
             
            ],
        
        }],
        order: [
            ["createdAt", "DESC"] // Sort by createdAt in descending order
          ]
    });

    return userAll;
   }
   static addBonus = async(req)=> {
    const { bonus } = req.body
    const { id} = req.params;
    const account = await Account.findOne({ where: { user_id: id}});
    const newAmount = parseInt(account.amount) + bonus;
    await Account.update({amount: newAmount},{where: {user_id: id}});
    return "Update successfully"
   }
   static changeLevel = async(req) => {
     const { level } = req.body
     await Account.update({level_id: level}, {where: {user_id:req.params.id}});
     return "Level Update"
   }
   static getWhoCash= async() => {
    const accounts = await Account.findAll({
        where: {
        withdraw:{
                [Op.gt]:0
        }
    
    },
    include: [{
        model : User,
        as: "owner",
        attributes: [
            "username",
            "token"
        ]
    }]
    })
    return accounts
   }
   static acceptWhoCash = async(req) => {
    const account = await Account.findOne({ where: {user_id: req.params.id}});
    if(account.withdraw > 0){
        const withId = Math.floor(Math.random()*999999)
    await withdraw.create({
        user_id: req.params.id,
        withdraw_id: withId,
        payout_amount: account.withdraw,
        withdraw_status: "Paid"
    });
    await Account.update({withdraw: 0}, {where: {user_id: req.params.id}})
    }
    return "Paid Successfully"
   }
   static rejectWhoCash=async(req)=>{
    const account = await Account.findOne({ where: {user_id: req.params.id}});
    if(account.withdraw > 0){   
        const newAmount = account.amount + account.withdraw
        await Account.update({amount:newAmount,withdraw: 0}, {where: {user_id: req.params.id}})
    }
    return "rejected successfully"
   }
}

export default AdminStatService;   