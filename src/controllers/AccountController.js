import AccountService from "../services/AccountService";


class AccountController{

    static getAccount = async(req,res)=> {
        try{
         
            const response = await AccountService.getAccount(req.user);
            return res.status(200).json({ status: 200, response})
        }catch(error){
            return res.status(500).json({
                status: 500,
                error: error.message
            });
        }
    }
    static withdraw = async(req,res) => {
        try{
         const response = await AccountService.withdraw(req);
          return res.status(200).json({ status: 200, message: response})
        }catch(error){
            return res.status(500).json({
                status: 500,
                error: error.message
            })
        }
    }
}

export default AccountController