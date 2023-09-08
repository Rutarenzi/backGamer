const { Deposit, Account,Level } = require("../database/models"); 
import axios from "axios";
class PaymentService {
    static getCurrency =  async (req, res) => {
        const { P_CURRENCY, X_API_KEY } = process.env; 
        try{
            const options = {
                method: "GET",
                maxBodyLength: Infinity,
                headers: {
                    "x-api-key": X_API_KEY        
                }
            }

            const response = await axios(P_CURRENCY, options);
            const result = await response.data;
           
            const { selectedCurrencies } = result;

         return res.status(200).json({status: 200, selectedCurrencies} );
        } catch(error){
          return  res.status(500).json({ status: 500, error: error.message});
        }

    }

    static estimateDeposit = async (req,res) => {
        try{
           const { P_ESTIMATE, X_API_KEY } = process.env;
           const { price } = req.body;
           const url = P_ESTIMATE + `amount=${price}&currency_from=usdt&currency_to=usd`;
           const options = {
            method: "GET",
            headers: {
                "x-api-key": X_API_KEY        
            }
        }
          
           const response = await axios(url,options);
           const { estimated_amount }= await response.data;
           
           return res.status(200).json({status: 200, estimated_amount});

        }catch(error){
            return res.status(500).json({status: 500, error: error.message});
        }
     }
   
    static pay = async (req,res) =>{
        try{
           const { P_PAY, X_API_KEY, P_CALLBACK } = process.env;
      
           const { price,pay } = req.body;
           const options ={
             method: "POST",
             maxBodyLength: Infinity,
             headers: {
                "x-api-key": X_API_KEY,
                "Content-Type": "application/json"
             },
             data: JSON.stringify({
                "price_amount": price,
                "price_currency": "usd",
                "pay_amount": pay,
                "pay_currency": "USDTTRC20",
                "ipn_callback_url": P_CALLBACK,
                "order_id": "123883427392",
                "order_description": "Deposit",
                "is_fixed_rate": true,
                "is_fee_paid_by_user": false
             })
           }
    
           
          const response = await axios(P_PAY,options);
          const result = await response.data;
          console.log(result)
    
          if(result.status !== false){
            const { id } = req.user;
            const { 
                payment_id,
                payment_status,
                pay_amount,
                amount_received,
                order_id,
                pay_currency,
                order_description,
                pay_address,
                purchase_id

            } = result;
        
           const deposit=  await Deposit.create({
                user_id:id,
                payment_id,
                payment_status,
                pay_amount,
                amount_received,
                order_id,
                purchase_id
            });
            await deposit.save();
            return res.status(200).json({status: 200,result:{pay_amount,pay_currency,order_description,pay_address}});
          } else{
            return res.status(403).json({status: 403, error:"Less amount"});
          }
          

        }catch(error){
            return res.status(500).json({status: 500, error: error.message});
        }
    }

    static pCallback = async (req,res) =>{
        try{
            const {
               payment_id,
               payment_status,
               pay_amount,
               order_id,
               purchase_id
             } = req.body;
             const payment = await Deposit.findOne({ where: { payment_id}});
              if(payment){
                await Deposit.update({payment_status},{where: {payment_id}})
                const account = await  Account.findOne({ where: { user_id:payment.id}});
                const newAmount = account.amount + pay_amount;
                const levels = await Level.findAll();
                const levelers = levels.map((item) =>{
                  return item.minimum;
                });
                if(payment_status == "finished"){
                    if(account.level_id == null){
                        for(let x = 0; x < levelers.length;x++){
                         if(x == levelers.length -1){
                             if(levelers[x] <= newAmount){
                                 await Account.update(
                                     { amount: newAmount, level_id: x+1},
                                     { where: { id:account.id}});
                                     console.log("a",x+1,newAmount)
                                 break;
                         } 
                     }else {
                             if(levelers[x] <= newAmount && newAmount <= levelers[x+1]){
                             await Account.update(
                                 { amount: newAmount, level_id: x+1},
                                 { where: { id:account.id}});
                                 console.log("b",x+1,newAmount);
                             break;
                         } else{
                             console.log("b",0,newAmount);
                             await Account.update( {amount: newAmount},{ where: {id:account.id}});
                         }
                     }
                        } 
                     } else{
                         for(let x = 0; x < levelers.length;x++){
                             if(x == levelers.length -1){
                                 if(levelers[x] <= newAmount){
                                     if(account.level_id < x+1){
                                         await Account.update(
                                             { amount: newAmount, level_id: x+1},
                                             { where: { id:account.id}});
                                             console.log("a",x+1,newAmount)
                                         break;
                                     }else{
                                         await Account.update(
                                             { amount: newAmount},
                                             { where: { id:account.id}});
                                             console.log("a",account.level_id,newAmount);
                                         break; 
                                     }
                                    
                             } 
                         }else {
                                 if(levelers[x] <= newAmount && newAmount <= levelers[x+1]){
                                     if(account.level_id < x+1){
                                         await Account.update(
                                             { amount: newAmount, level_id: x+1},
                                             { where: { id:account.id}});
                                             console.log("a",x+1,newAmount)
                                         break;
                                     }else{
                                         await Account.update(
                                             { amount: newAmount},
                                             { where: { id:account.id}});
                                             console.log("a",account.level_id,newAmount);
                                         break; 
                                     }
                             } else{
                                 console.log("b",account.level_id,newAmount);
                                 await Account.update( {amount: newAmount},{ where: {id:account.id}});
                             }
                         }
                            } 
     
                     }
                }
                return res.status(200).json({ status: 200, result:{ payment_id,
                    payment_status}})
              }
            

        }catch(error){
            res.status(500).json({status: 500, error:error.message})
        }
    }

}

export default PaymentService;