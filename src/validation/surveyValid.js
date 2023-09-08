import Joi from "joi";

const SurveySchema = Joi.object({
    title: Joi.string().required().max(100),
    description: Joi.string().required().min(255),
});

const SurveyValidate = async(req, res, next )=> {            
    const { error } = SurveySchema.validate(req.body, {abortEarly: false});
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

export default SurveyValidate;  