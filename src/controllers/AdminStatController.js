import AdminStatService from "../services/AdminStatService"


class AdminStatController{
 static getAllStat =async(req,res)=>{
  try{
    const response = await AdminStatService.getAllStat();
     return res.status(200).json({status: 200, response})
  }catch(error){
    return res.status(500).json({status: 500, error:error.message})
  }
 }
 static newUser =async(req, res)=>{
    try{
      const response = await AdminStatService.newUser();
      return res.status(200).json({status: 200, response})
    }catch(error){
      console.log(error.message)
      return res.status(500).json({status: 500, error:error.message})
    }
 }
 static getUser =async (req,res) => {
  try{
     const response = await AdminStatService.getUser(req.params.id);
     return res.status(200).json({status:200, response});
  }catch(error){
    return res.status(500).status({ status: 500, error:error.message})
  }
 }
 static getAllUser= async(req,res)=>{
    try{
       const response = await AdminStatService.getAllUser();
       return res.status(200).json({status:200, response});
    }catch(error){
      return res.status(500).status({status: 500, error:error.message})
    }
 }
 static addBonus = async(req, res) => {
  try{ 
     const response = await AdminStatService.addBonus(req);
     return res.status(200).json({status: 200, message: response})
  }catch(error){
    return res.status(500).json({ status: 500, error: error.message})
  }
 }
 static changeLevel = async(req, res) => {
  try{
      const response = await AdminStatService.changeLevel(req);
      return res.status(200).json({ status: 200, message: response})
  }catch(error){
    return res.status(500).json({ status: 500, error:error.message})
  }
 }
 static getWhoCash =async (req, res) => {
      try{
        const response = await AdminStatService.getWhoCash();
        return res.status(200).json({ status: 200, response});
      }catch(error){
        return res.status(500).json({ status: 500, error: error.message})
      }
 }
 static acceptWhoCash = async (req,res) => {
  try{
   const response = await AdminStatService.acceptWhoCash(req)
   return res.status(200).json({ status: 200, message: response})
  }catch(error){
    return res.status(500).json({ status: 500, error: error.message})
  }
 }
 static rejectWhoCash = async(req, res)=> {
  try{
    const response = await AdminStatService.rejectWhoCash(req)
    return res.status(200).json({ status: 200, message: response})
   }catch(error){
     return res.status(500).json({ status: 500, error: error.message})
   }
 }
}

export default AdminStatController