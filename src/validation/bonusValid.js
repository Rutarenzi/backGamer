import Joi from "joi";

const BonusSchema = Joi.object({
   bonus: Joi.number().required().integer().min(3),
});

const bonusValidate = async (req,res, next) => {
    const { error } = BonusSchema.validate(req.body, {abortEarly: false});
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

export default bonusValidate;