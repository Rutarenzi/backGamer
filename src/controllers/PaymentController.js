import PaymentService from "../services/PaymentService";


class PaymentController{
    static getCurrency = async (req,res) =>{
        try{
           await PaymentService.getCurrency(res,res)
        }catch(error){
            return res.status(500).json({status: 500, error: error.message})
        }
    }
    static estimateDeposit = async (req,res) =>{
        try{
            await PaymentService.estimateDeposit(req,res);
        }catch(error){
            return res.status(500).json({status: 500, error : error.message});
        }
    }

    static pay = async (req,res) => {
        try{
           await PaymentService.pay(req,res);
        }catch(error){
           return res.status(500).json({status: 500, error:error.message});
        }
    }
    static pCallback =async (req,res)=>{
        try{
           await PaymentService.pCallback(req,res);
        }catch(error){
            return res.status(500).json({ status: 500, error:error.message});
        }
    }
}

export default PaymentController;