import Joi from  "joi";
import  PasswordComplexity  from "joi-password-complexity";

const loginSchema = Joi.object({
    username: Joi.string().min(5).trim().required(),
    password: new PasswordComplexity({
        min: 4,
        max: 15,
        lowerCase: 1,
    }).required(),
});

const loginValidate = ( req,res, next) =>{
    try{ 
      const { error } = loginSchema.validate(req.body, { abortEarly: false});
      if(error){
        return res.status(400).json({
            status: 400,
            error: error.details.map(
                (details) => details.message.replace(/[^a-zA-Z0-9]/g, " ")
            ),
        });
      } else{
        next();
      }
    }catch(error){
        return res.status(500).json({ status: 500, error:error.message});
    }
}
export default loginValidate;