
const isAdmin = async(req, res, next) => {
try{
  const { role } = req.user;
  if(role != "admin"){
    console.log(role)
    return res.status(401).json({ status: 401, error:"Authorized User"})
  }
  next();
}catch(error){
    return res.status(500).json({status: 500, error:error.message})
}
}

export default isAdmin;