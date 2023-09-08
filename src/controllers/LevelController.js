import LevelService from "../services/levelService";

class LevelController {
   static async levelCreate(req, res){
    try{
       const response = await LevelService.levelCreate(req);
       return res.status(201).json({ status: 201, message:response});
    }catch(error){
        res.status(500).json({ status: 500, error:error.message});
    }
   }
   static getLevel = async(req,res)=>{
    try{
       const response = await LevelService.getLevel();
       return res.status(200).json({ status: 200, response});
    }catch(error){
        return res.status(500).json({ status: 500, error:error.message});
    }
    
   }

   static oneLevel=async(req,res)=>{
    try{
        const response = await LevelService.oneLevel(req);
        return res.status(200).json({status: 200, response});
    }catch(error){
        return res.status(500).json({ status: 500, error:error.message});
    }
   }
   static editLevel = async(req,res)=>{
    try{
      const response = await LevelService.editLevel(req);
      return res.status(200).json({ status: 200, message:response});
    }catch(error){
        return res.status(500).json({ status: 500, error:error.message});
    }
   }
   static deleteLevel = async(req, res)=>{
    try{
     const response = await LevelService.deleteLevel(req.params.id);
      return res.status(200).json({ status: 200, message: response})
    }catch(error){
        return res.status(500).json({ status: 500, error: error.message})
    }
   }
}

export default LevelController;