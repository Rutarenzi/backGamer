import BcryptUtils from "../utils/brcypt";

const { User } = require("../database/models");

const checkPswd = async(req,res, next) =>{
    try{

        const { username,password } = req.body;
        const user = await User.findOne({ where: { username }});
        const compare = BcryptUtils.compare(password,user.password);
       
        if(!compare){
            return res.status(400).json({ status: 400, error: "Invalid password"});
           }
 next();
}catch(error){
    return res.status(500).json({ status: 500, error: `server error, ${error}`});
}
}

export default checkPswd