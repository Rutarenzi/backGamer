import Joi from "joi";

const DepositeSchema = Joi.object({
   price: Joi.number().required().integer(),
});

const depositValidate = async (req,res, next) => {
    const { error } = DepositeSchema.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(400).json({
            status: 400,
            error: error.details.map(
                (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
            ),
        });
    
}
next();
}

export default depositValidate;