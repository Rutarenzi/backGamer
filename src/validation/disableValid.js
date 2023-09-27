import Joi from "joi";

const disableSchema = Joi.object({
    status: Joi.string().min(1).required(),
});

const disableValidate = async(req, res, next) => {
    const { error} = disableSchema.validate(req.body, {abortEarly: false});
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

export default disableValidate