import Joi from "joi";

const withdrawSchema = Joi.object({
    withdraw: Joi.number().required().integer().min(2)
});

const withdrawValidate = async(req, res, next) => {
    const { error} = withdrawSchema.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(400).json({
            status: 400,
            error: error.details.map(
                (detail) => detail.message.replace(/[^a-zA-Z0-9 ]/g, "")
            ),
        })
    }
    next();
}

export default withdrawValidate