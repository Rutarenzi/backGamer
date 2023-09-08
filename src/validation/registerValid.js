import Joi from "joi";
import PasswordComplexity from "joi-password-complexity";

const registerSchema = Joi.object({
    username: Joi.string().max(7).trim().required(),
    fullname: Joi.string().required(),
    phone: Joi.string().trim().min(8).required(),
    whatsapp: Joi.string().trim().min(8).required(),
    password: new PasswordComplexity({
        min: 8,
        max: 15,
        lowerCase: 1,
        numeric: 1,
    }).required(),
    referrer: Joi.string().required().max(7),
     
}); 

const registerValidate = (req,res, next) =>{
    const { error } = registerSchema.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(400).json({
            status: 400,
            error: error.details.map(
                (details) => details.message.replace(/[^a-zA-Z0-9]/g, " ")
            ),
        });
    } else {
        next();
    }
};

export default registerValidate;