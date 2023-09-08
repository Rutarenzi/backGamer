import upload from "../config/multer";


const cloudCheck = (name) => {
    return async (req,res, next) => {

        try{
           
       upload.single(name)(req, res, (err) => {
        if(err){
            return res.status(400).json({
                status: 400,
                error: "Unsupported Format"
            });
        }
        next();
       });
        }catch(error){
            res.status(500).json({status: 500, error: "Couldinary Error!!"})
        };
    };
};

export default cloudCheck