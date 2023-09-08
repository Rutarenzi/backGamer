import ComService from "../services/ComService";

class ComController {
  static calculate = async(req,res) => {
    try{
      const response = await ComService.calculate(req);
      return res.status(200).json({ status:200, response});
    }catch(error){
        res.status(500).json({ status: 500, error:error.message});
    }
  }
    
}

export default ComController;