import Joi from "joi";

const LevelSchema = Joi.object({
    name: Joi.string().required().max(6),
    minimum: Joi.number().required().integer(),
    commission_rate: Joi.number().required().integer(),
    image: Joi.object().required(),
});

const LevelValidate = async(req, res, next )=> {  
    const { name, minimum, commission_rate } = req.body 
    const data ={name, minimum, commission_rate, image: req.file}        
    const { error } = LevelSchema.validate(data, {abortEarly: false});
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

export default LevelValidate; 