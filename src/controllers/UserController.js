import UserService from "../services/UserService";

class UserController {    
    static async register(req,res){
        try{

            const response = await UserService.register(req.body);
           return res.status(201).json({ status: 201, message:response });
        }catch(error){
            console.log(error)
           return  res.status(500).json({ status: 500, error: error.message});
        }
    }

    static async login(req,res){
        try{

            const response = await UserService.login(req.user);
           console.log(new Date(Date.now() + 604800000))
           return res.status(200).cookie("token", response.user.token, {
            expires: new Date(Date.now() + 604800000),
            secure: false,
            httpOnly: true
           }).json({ status: 200, response});
        }catch(error){
            console.log(error)
            return res.status(500).json({ status: 500, error:error.message});
        }
    }
    
    static async logout(req,res){
        try{

          const response = await UserService.logout(req);    
           return res.status(200).json({status: 200, message:response});
        }catch(error){
            return res.status(500).json({status: 500, error:error.message});
        }
    }

    static userUpdate= async(req,res)=> {
      try{

       const response = await UserService.userUpdate(req);
       return res.status(200).json({ status: 200, message: response})
      }catch(error){
        return res.status(500).json({status: 500, error: error.message})
      }
    }
    static adminUpdateUser = async(req, res)=> {
        try{
          const response = await UserService.adminUpdateUser(req);
          return res.status(200).json({ status: 200, message: response})
        }catch(error){
            return res.status(500).json({ status: 500, error:error.message})
        }
    }
    static adminDeleteUser = async(req,res) => {
        try{
           const response = await  UserService.adminDeleteUser(req.params.id);
           return res.status(200).json({ status: 200, message: response})
        }catch(error){
            return res.status(500).json({ status: 500, error: error.message})
        }
    }
}

export default UserController;