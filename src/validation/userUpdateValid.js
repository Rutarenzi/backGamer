import Joi from "joi";


const userUpdateSchema = Joi.object({
    username: Joi.string().max(7).trim().required(),
    fullname: Joi.string().required(),
    phone: Joi.string().trim().min(8).required(),
    whatsapp: Joi.string().trim().min(8).required(),
    referrer: Joi.string().required().max(7),
    referal_code: Joi.string().required().max(7)
     
}); 

const userUpdateValidate = (req,res, next) =>{
    const { error } = userUpdateSchema.validate(req.body, {abortEarly: false});
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

export default userUpdateValidate;